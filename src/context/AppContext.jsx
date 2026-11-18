import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import {
  POST_TYPES,
  REACTIONS,
  SCHEMA_VERSION,
  STATUS,
  STORAGE_KEY,
  VIEWER,
  XP_RULES,
  createInitialData,
  politicians,
} from '../data/data.js'
import { toISODate, uid } from '../utils/helpers.js'

const EDIT_KEY = `${STORAGE_KEY}:edit-mode`
const AppContext = createContext(null)

const isValidSnapshot = (value) =>
  Boolean(value) && value.version === SCHEMA_VERSION && Array.isArray(value.projects) && Array.isArray(value.posts)

// ---------- helpers de estado (puros) ----------
const emptyReactions = () => Object.fromEntries(REACTIONS.map((r) => [r.id, 0]))

function bumpActivity(activity, type) {
  const key = toISODate()
  const day = activity[key] ?? { total: 0, protocolo: 0, voto: 0, atualizacao: 0, prestacao: 0 }
  return { ...activity, [key]: { ...day, [type]: (day[type] ?? 0) + 1, total: day.total + 1 } }
}

const award = (profile, rule) => ({ ...profile, xp: profile.xp + (XP_RULES[rule] ?? 0) })

function buildPost({ type = 'atualizacao', content, projectId = null }) {
  return {
    id: uid('post'),
    type,
    projectId,
    content,
    createdAt: new Date().toISOString(),
    reactions: emptyReactions(),
    comments: [],
  }
}

function nextProjectNumber(projects) {
  const highest = Math.max(0, ...projects.map((p) => parseInt(p.number.match(/\d+/)?.[0] ?? '0', 10)))
  return `PL ${String(highest + 1).padStart(3, '0')}/${new Date().getFullYear()}`
}

// ---------- provider ----------
export function AppProvider({ children }) {
  const [data, setData] = useLocalStorage(STORAGE_KEY, createInitialData, isValidSnapshot)
  const [editMode, setEditMode] = useLocalStorage(EDIT_KEY, false)

  const toggleEditMode = useCallback(() => setEditMode((v) => !v), [setEditMode])
  const resetData = useCallback(() => setData(createInitialData()), [setData])
  const selectPolitician = useCallback((politicianId) => {
    const politician = politicians.find(({ id }) => id === politicianId)
    if (!politician) return

    setData((prev) => {
      const activeId = prev.activePoliticianId || prev.profile.id
      if (activeId === politicianId) return prev

      const activeSnapshot = {
        profile: prev.profile,
        badges: prev.badges,
        projects: prev.projects,
        timeline: prev.timeline,
        posts: prev.posts,
        activity: prev.activity,
      }
      const targetSnapshot = prev.politicianSnapshots?.[politicianId] || {
        profile: politician.profile,
        badges: politician.badges,
        projects: politician.projects,
        timeline: politician.timeline,
        posts: politician.posts,
        activity: politician.activity,
      }

      return {
        ...prev,
        ...targetSnapshot,
        activePoliticianId: politicianId,
        politicianSnapshots: {
          ...prev.politicianSnapshots,
          [activeId]: activeSnapshot,
        },
      }
    })
  }, [setData])
  const saveQuizResult = useCallback(
    (result) => {
      setData((prev) => ({
        ...prev,
        viewer: { ...prev.viewer, quizResult: result },
      }))
    },
    [setData],
  )

  // Político: protocola um novo projeto (vira "repositório" + post automático + XP + heatmap)
  const addProject = useCallback(
    ({ title, summary, tags = [], readme = '' }) => {
      setData((prev) => {
        const now = new Date().toISOString()
        const project = {
          id: uid('pl'),
          number: nextProjectNumber(prev.projects),
          title: title.trim(),
          summary: summary.trim(),
          tags,
          readme: readme.trim() || summary.trim(),
          status: 'em_tramitacao',
          stars: 0,
          amendments: [],
          commits: [{ id: uid('cm'), date: now, kind: 'protocolo', message: 'Projeto protocolado' }],
          createdAt: now,
          updatedAt: now,
        }
        const announcement = buildPost({
          content: `Acabei de protocolar o ${project.number}: ${project.title}. ${project.summary}`,
          projectId: project.id,
        })
        return {
          ...prev,
          projects: [project, ...prev.projects],
          posts: [announcement, ...prev.posts],
          activity: bumpActivity(prev.activity, 'protocolo'),
          profile: award(prev.profile, 'novo_projeto'),
        }
      })
    },
    [setData],
  )

  // Político: muda o status de um projeto (gera "commit" no histórico + post automático)
  const updateProjectStatus = useCallback(
    (projectId, status, note = '') => {
      if (!STATUS[status]) return
      setData((prev) => {
        const project = prev.projects.find((p) => p.id === projectId)
        if (!project) return prev
        const now = new Date().toISOString()
        const message = note.trim() || `Status alterado para "${STATUS[status].label}"`
        const updated = {
          ...project,
          status,
          updatedAt: now,
          commits: [{ id: uid('cm'), date: now, kind: 'status', message }, ...project.commits],
        }
        const announcement = buildPost({
          content: `Atualização do ${project.number}: ${message}`,
          projectId,
        })
        return {
          ...prev,
          projects: prev.projects.map((p) => (p.id === projectId ? updated : p)),
          posts: [announcement, ...prev.posts],
          activity: bumpActivity(prev.activity, 'atualizacao'),
          profile: award(prev.profile, 'atualizacao_status'),
        }
      })
    },
    [setData],
  )

  // Político: publica uma atualização no feed
  const addPost = useCallback(
    ({ content, projectId = null, type = 'atualizacao' }) => {
      if (!content?.trim()) return
      setData((prev) => ({
        ...prev,
        posts: [buildPost({ type, content: content.trim(), projectId }), ...prev.posts],
        activity: bumpActivity(prev.activity, POST_TYPES[type]?.activity ?? 'atualizacao'),
        profile: award(prev.profile, 'novo_post'),
      }))
    },
    [setData],
  )

  // Cidadão (ou o político, se o modo de edição estiver ligado) comenta em um post
  const addComment = useCallback(
    (postId, content) => {
      if (!content?.trim()) return
      setData((prev) => {
        const who = editMode
          ? { author: prev.profile.name, initials: prev.profile.initials, isAuthor: true }
          : { author: VIEWER.name, initials: VIEWER.initials, isAuthor: false }
        const comment = { id: uid('c'), ...who, content: content.trim(), createdAt: new Date().toISOString() }
        return {
          ...prev,
          posts: prev.posts.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)),
        }
      })
    },
    [setData, editMode],
  )

  // Cidadão apoia / remove apoio de um projeto ("Star")
  const toggleStar = useCallback(
    (projectId) => {
      setData((prev) => {
        const starred = prev.viewer.starred.includes(projectId)
        return {
          ...prev,
          viewer: {
            ...prev.viewer,
            starred: starred ? prev.viewer.starred.filter((id) => id !== projectId) : [...prev.viewer.starred, projectId],
          },
          projects: prev.projects.map((p) =>
            p.id === projectId ? { ...p, stars: Math.max(0, p.stars + (starred ? -1 : 1)) } : p,
          ),
        }
      })
    },
    [setData],
  )

  // Cidadão reage a um post (liga/desliga cada reação)
  const toggleReaction = useCallback(
    (postId, reactionId) => {
      setData((prev) => {
        const mine = prev.viewer.reactions[postId] ?? []
        const has = mine.includes(reactionId)
        return {
          ...prev,
          viewer: {
            ...prev.viewer,
            reactions: {
              ...prev.viewer.reactions,
              [postId]: has ? mine.filter((r) => r !== reactionId) : [...mine, reactionId],
            },
          },
          posts: prev.posts.map((p) =>
            p.id === postId
              ? { ...p, reactions: { ...p.reactions, [reactionId]: Math.max(0, (p.reactions[reactionId] ?? 0) + (has ? -1 : 1)) } }
              : p,
          ),
        }
      })
    },
    [setData],
  )

  const value = useMemo(
    () => ({
      data,
      editMode,
      setEditMode,
      toggleEditMode,
      resetData,
      selectPolitician,
      saveQuizResult,
      addProject,
      updateProjectStatus,
      addPost,
      addComment,
      toggleStar,
      toggleReaction,
    }),
    [data, editMode, setEditMode, toggleEditMode, resetData, selectPolitician, saveQuizResult, addProject, updateProjectStatus, addPost, addComment, toggleStar, toggleReaction],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp precisa estar dentro de <AppProvider>')
  return ctx
}
