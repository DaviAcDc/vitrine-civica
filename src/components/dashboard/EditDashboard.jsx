import { useState } from 'react'
import { FilePlus2, Megaphone, PencilLine, Send } from 'lucide-react'
import { POST_TYPES, STATUS, TAGS } from '../../data/data.js'
import { useApp } from '../../context/AppContext.jsx'

const fieldLabel = 'mb-1.5 block text-sm font-medium text-civic-text'

export default function EditDashboard() {
  const { data, editMode, addProject, updateProjectStatus, addPost } = useApp()
  const [projectForm, setProjectForm] = useState({ title: '', summary: '', readme: '', tags: [] })
  const [postForm, setPostForm] = useState({ content: '', projectId: '', type: 'atualizacao' })
  const [statusNotes, setStatusNotes] = useState({})
  const [notice, setNotice] = useState('')

  if (!editMode) return null

  const toggleTag = (tag) => {
    setProjectForm((current) => ({
      ...current,
      tags: current.tags.includes(tag) ? current.tags.filter((item) => item !== tag) : [...current.tags, tag],
    }))
  }

  const submitProject = (event) => {
    event.preventDefault()
    addProject(projectForm)
    setProjectForm({ title: '', summary: '', readme: '', tags: [] })
    setNotice('Projeto protocolado e publicado no perfil.')
  }

  const submitPost = (event) => {
    event.preventDefault()
    addPost({
      content: postForm.content,
      projectId: postForm.projectId || null,
      type: postForm.type,
    })
    setPostForm((current) => ({ ...current, content: '' }))
    setNotice('Atualização publicada no feed.')
  }

  const changeStatus = (projectId, status) => {
    const note = statusNotes[projectId] || ''
    updateProjectStatus(projectId, status, note)
    setStatusNotes((current) => ({ ...current, [projectId]: '' }))
    setNotice('Status atualizado e registrado no histórico do projeto.')
  }

  return (
    <section className="animate-fade-in space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white">Painel do político</h2>
        <p className="mt-1 text-sm text-civic-muted">Ações de demonstração são salvas neste navegador e refletem no perfil público.</p>
        {notice && <p role="status" className="mt-3 rounded-md border border-civic-green/30 bg-civic-green/10 px-3 py-2 text-sm text-civic-mint">{notice}</p>}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <form onSubmit={submitProject} className="card space-y-4 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-white">
            <FilePlus2 className="h-5 w-5 text-civic-cyan" aria-hidden="true" />
            Protocolar projeto
          </h3>
          <div>
            <label className={fieldLabel} htmlFor="project-title">Nome do projeto</label>
            <input id="project-title" className="input" value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} required maxLength={100} placeholder="Ex.: Transporte acessível para todos" />
          </div>
          <div>
            <label className={fieldLabel} htmlFor="project-summary">Resumo</label>
            <textarea id="project-summary" className="input min-h-20 resize-y" value={projectForm.summary} onChange={(event) => setProjectForm({ ...projectForm, summary: event.target.value })} required maxLength={300} placeholder="Explique a proposta em poucas palavras." />
          </div>
          <fieldset>
            <legend className={fieldLabel}>Temas</legend>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <label key={tag} className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs transition ${projectForm.tags.includes(tag) ? 'border-civic-cyan/60 bg-civic-cyan/10 text-civic-cyan' : 'border-civic-line text-civic-muted hover:text-civic-text'}`}>
                  <input className="sr-only" type="checkbox" checked={projectForm.tags.includes(tag)} onChange={() => toggleTag(tag)} />
                  {tag}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label className={fieldLabel} htmlFor="project-readme">README em linguagem simples <span className="font-normal text-civic-muted">(opcional)</span></label>
            <textarea id="project-readme" className="input min-h-28 resize-y font-mono text-xs" value={projectForm.readme} onChange={(event) => setProjectForm({ ...projectForm, readme: event.target.value })} maxLength={5000} placeholder={'## Em linguagem simples\nExplique o que muda para a população.\n\n- Quem será beneficiado?'} />
          </div>
          <button type="submit" className="btn btn-primary">
            <FilePlus2 className="h-4 w-4" aria-hidden="true" /> Protocolar projeto
          </button>
        </form>

        <form onSubmit={submitPost} className="card space-y-4 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-white">
            <Megaphone className="h-5 w-5 text-civic-cyan" aria-hidden="true" />
            Publicar atualização
          </h3>
          <div>
            <label className={fieldLabel} htmlFor="post-type">Tipo de publicação</label>
            <select id="post-type" className="input" value={postForm.type} onChange={(event) => setPostForm({ ...postForm, type: event.target.value })}>
              {Object.entries(POST_TYPES).map(([id, type]) => <option key={id} value={id}>{type.label}</option>)}
            </select>
          </div>
          <div>
            <label className={fieldLabel} htmlFor="post-project">Projeto relacionado <span className="font-normal text-civic-muted">(opcional)</span></label>
            <select id="post-project" className="input" value={postForm.projectId} onChange={(event) => setPostForm({ ...postForm, projectId: event.target.value })}>
              <option value="">Nenhum projeto</option>
              {data.projects.map((project) => <option key={project.id} value={project.id}>{project.number} · {project.title}</option>)}
            </select>
          </div>
          <div>
            <label className={fieldLabel} htmlFor="post-content">Mensagem</label>
            <textarea id="post-content" className="input min-h-40 resize-y" value={postForm.content} onChange={(event) => setPostForm({ ...postForm, content: event.target.value })} required maxLength={2000} placeholder="Compartilhe o que aconteceu, os próximos passos e como as pessoas podem participar." />
            <p className="mt-1 text-right text-xs text-civic-muted">{postForm.content.length}/2000</p>
          </div>
          <button type="submit" className="btn btn-primary">
            <Send className="h-4 w-4" aria-hidden="true" /> Publicar no feed
          </button>
        </form>
      </div>

      <section className="card p-5">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
          <PencilLine className="h-5 w-5 text-civic-cyan" aria-hidden="true" />
          Atualizar tramitação
        </h3>
        <div className="space-y-3">
          {data.projects.map((project) => (
            <div key={project.id} className="grid gap-3 rounded-md border border-civic-line bg-civic-bg/40 p-3 md:grid-cols-[minmax(0,1fr)_minmax(180px,0.7fr)_auto] md:items-center">
              <div className="min-w-0">
                <p className="font-mono text-xs text-civic-muted">{project.number}</p>
                <p className="truncate text-sm font-medium text-civic-text">{project.title}</p>
              </div>
              <label className="sr-only" htmlFor={`dashboard-status-${project.id}`}>Nota sobre a alteração de status</label>
              <input
                id={`dashboard-status-${project.id}`}
                className="input py-1.5 text-xs"
                placeholder="Nota do andamento (opcional)"
                value={statusNotes[project.id] || ''}
                onChange={(event) => setStatusNotes({ ...statusNotes, [project.id]: event.target.value })}
              />
              <div className="flex items-center gap-2">
                <select
                  className="input py-1.5 text-xs"
                  aria-label={`Novo status de ${project.title}`}
                  value={project.status}
                  onChange={(event) => changeStatus(project.id, event.target.value)}
                >
                  {Object.entries(STATUS).map(([id, status]) => <option key={id} value={id}>{status.label}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
