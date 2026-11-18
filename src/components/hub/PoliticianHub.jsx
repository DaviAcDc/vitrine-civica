import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Award, BadgeCheck, BriefcaseBusiness, GraduationCap, MapPin, Search, ShieldCheck, UserRound, X } from 'lucide-react'
import { BRAZIL_UFS, POLITICAL_QUIZ_QUESTIONS, politicians, STATUS } from '../../data/data.js'
import { useApp } from '../../context/AppContext.jsx'
import { activityStats, levelFromXp, levelTitle, toISODate } from '../../utils/helpers.js'
import AxisComparison from '../quiz/AxisComparison.jsx'

const stateNames = new Map(BRAZIL_UFS.map(({ uf, name }) => [uf, name]))
const officeOptions = [
  { value: 'deputado-estadual', label: 'Deputado Estadual' },
  { value: 'deputado-federal', label: 'Deputado Federal' },
  { value: 'senador', label: 'Senador' },
  { value: 'governador', label: 'Governador' },
]
const tabs = [
  { id: 'projects', label: 'Projetos de Lei' },
  { id: 'votes', label: 'Votações Recentes' },
  { id: 'trajectory', label: 'Trajetória' },
  { id: 'alignment', label: 'Alinhamento' },
]
const heatmapClasses = ['bg-heat-0', 'bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4']

function getMiniActivity(activity) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: 84 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (83 - index))
    const key = toISODate(date)
    const entry = activity[key]
    return { key, date, total: entry?.total || 0 }
  })
}

function activityLevel(total) {
  if (!total) return 0
  if (total <= 2) return 1
  if (total <= 4) return 2
  if (total <= 7) return 3
  return 4
}

function Metric({ label, value, note }) {
  return (
    <div className="rounded-xl border border-civic-line bg-civic-bg/80 p-3 text-center">
      <p className="text-lg font-semibold text-civic-mint">{value}</p>
      <p className="mt-1 text-[11px] font-medium text-civic-text">{label}</p>
      {note && <p className="mt-1 text-[10px] text-civic-muted">{note}</p>}
    </div>
  )
}

function MiniActivity({ activity }) {
  const days = getMiniActivity(activity)
  const stats = activityStats(activity)
  return (
    <section className="mt-6 rounded-xl border border-civic-line bg-civic-bg/70 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-white">Atividade cívica · últimos 84 dias</h3>
        <span className="text-xs text-civic-muted">{stats.total} atividades no histórico demonstrativo</span>
      </div>
      <div className="mt-3 grid grid-flow-col grid-rows-7 gap-1" aria-label="Heatmap demonstrativo de atividade cívica">
        {days.map(({ key, date, total }) => (
          <span
            key={key}
            title={`${date.toLocaleDateString('pt-BR')}: ${total} atividade(s)`}
            aria-label={`${date.toLocaleDateString('pt-BR')}: ${total} atividade(s)`}
            className={`aspect-square w-full max-w-3 rounded-[2px] ${heatmapClasses[activityLevel(total)]}`}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-civic-muted">
        <span>Menos</span>
        <span className="flex gap-1">{heatmapClasses.map((className, index) => <i key={index} className={`h-2.5 w-2.5 rounded-[2px] ${className}`} />)}</span>
        <span>Mais</span>
      </div>
    </section>
  )
}

function ProjectDetails({ projects }) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <article key={project.id} className="rounded-xl border border-civic-line bg-civic-bg/70 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs text-civic-cyan">{project.number}</span>
            <span className="rounded-full border border-civic-line px-2.5 py-1 text-xs text-civic-text">
              {STATUS[project.status]?.label || project.status}
            </span>
          </div>
          <h4 className="mt-2 text-base font-semibold text-white">{project.title}</h4>
          <p className="mt-1 text-sm leading-6 text-civic-muted">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-civic-muted">
            <span>{project.stars || 0} apoios</span>
            <span>{project.amendments?.length || 0} emendas</span>
            <span>Atualizado em {new Date(project.updatedAt || project.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
          {project.readme && (
            <details className="mt-4 rounded-lg border border-civic-line bg-civic-raised/50 p-3">
              <summary className="cursor-pointer text-sm font-medium text-civic-cyan">README · detalhes da proposta</summary>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-xs leading-6 text-civic-text">{project.readme}</pre>
            </details>
          )}
        </article>
      ))}
      {!projects.length && <p className="rounded-lg border border-civic-line p-4 text-sm text-civic-muted">Nenhum projeto cadastrado neste perfil demonstrativo.</p>}
    </div>
  )
}

function VoteDetails({ votes }) {
  return (
    <div className="space-y-3">
      {votes.map((vote) => (
        <article key={vote.id} className="rounded-xl border border-civic-line bg-civic-bg/70 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h4 className="font-semibold text-white">{vote.title}</h4>
            <span className={`rounded-full border px-2.5 py-1 text-xs ${vote.vote === 'A favor' ? 'border-civic-green/30 text-civic-mint' : 'border-civic-line text-civic-text'}`}>{vote.vote}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-civic-muted">{vote.summary}</p>
          <p className="mt-2 text-xs text-civic-muted">{new Date(vote.date).toLocaleDateString('pt-BR')}</p>
        </article>
      ))}
    </div>
  )
}

function TrajectoryDetails({ timeline }) {
  const sections = [
    { key: 'mandates', title: 'Mandatos e funções públicas', icon: Award },
    { key: 'experience', title: 'Experiência profissional', icon: BriefcaseBusiness },
    { key: 'education', title: 'Formação', icon: GraduationCap },
  ]
  return (
    <div className="space-y-5">
      {sections.map(({ key, title, icon: Icon }) => (
        <section key={key}>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-white"><Icon className="h-4 w-4 text-civic-cyan" aria-hidden="true" />{title}</h4>
          <ol className="mt-3 space-y-3 border-l border-civic-line pl-4">
            {(timeline[key] || []).map((item) => (
              <li key={item.id} className="relative rounded-lg border border-civic-line bg-civic-bg/70 p-3 before:absolute before:-left-[21px] before:top-4 before:h-2 before:w-2 before:rounded-full before:bg-civic-cyan">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <strong className="text-sm text-white">{item.title}</strong>
                  <span className="text-xs text-civic-cyan">{item.start} — {item.end || 'presente'}</span>
                </div>
                <p className="mt-1 text-xs text-civic-text">{item.organization}</p>
                {item.description && <p className="mt-2 text-xs leading-5 text-civic-muted">{item.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

function PoliticianDetails({ politician, quizResult, onClose, onOpenProfile }) {
  const [activeTab, setActiveTab] = useState('projects')
  const level = levelFromXp(politician.profile.xp)
  const affinity = quizResult?.matches?.find(
    ({ politicianId, axes }) => politicianId === politician.id && axes?.length === POLITICAL_QUIZ_QUESTIONS.length,
  )

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const metrics = politician.metrics
  const progressToNext = Math.floor(level.progress * 100)

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-black/75 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="politician-dialog-title"
        className="card my-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto shadow-2xl"
      >
        <header className="bg-steam-header p-5 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white/10 bg-civic-raised text-2xl font-bold text-white shadow-glow">
              {politician.profile.avatarUrl
                ? <img src={politician.profile.avatarUrl} alt={`Avatar de ${politician.name}`} className="h-full w-full object-cover" />
                : politician.profile.initials || <UserRound className="h-8 w-8" aria-hidden="true" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-civic-cyan">{politician.role} · {politician.state} — {stateNames.get(politician.state)}</p>
              <h2 id="politician-dialog-title" className="mt-1 text-xl font-bold text-white sm:text-2xl">{politician.name}</h2>
              <p className="mt-1 text-sm text-civic-muted">{politician.party.acronym} · {politician.party.name} · {politician.profile.handle}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-civic-text">{politician.bio}</p>
            </div>
            <button type="button" className="btn shrink-0 px-2" onClick={onClose} aria-label="Fechar perfil">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mx-auto mt-6 max-w-2xl">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-white">Nível {level.level} · {levelTitle(level.level)}</span>
              <span className="text-civic-mint">{politician.profile.xp.toLocaleString('pt-BR')} XP · {progressToNext}% para o próximo nível</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full border border-civic-green/20 bg-civic-bg/80" role="progressbar" aria-label="Progresso de XP" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressToNext}>
              <div className="h-full rounded-full bg-gradient-to-r from-civic-green to-civic-mint" style={{ width: `${progressToNext}%` }} />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {politician.badges.map((badge) => (
              <span key={badge.id} title={badge.description} className="inline-flex items-center gap-1.5 rounded-lg border border-civic-green/30 bg-civic-green/5 px-3 py-2 text-xs text-civic-mint">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />{badge.label}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-6 p-5 sm:p-8">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <Metric label="Assiduidade" value={`${metrics.presence}%`} />
            <Metric label="Transparência" value={`${metrics.transparency}/100`} />
            <Metric label="Uso da cota" value={`${metrics.quotaUsePct}%`} note="do limite demonstrativo" />
            <Metric label="Custo-benefício" value={`${metrics.costBenefit}/100`} note="índice demonstrativo" />
            <Metric label="Projetos aprovados" value={`${metrics.projectsApproved}/${metrics.projectsPresented}`} note="apresentados" />
            <Metric label="Sessões / votos" value={`${metrics.sessionsAttended} / ${metrics.plenaryVotes}`} />
          </div>

          <MiniActivity activity={politician.activity} />

          <div className="border-b border-civic-line">
            <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Seções do perfil demonstrativo">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm ${activeTab === tab.id ? 'bg-civic-cyan/10 text-civic-cyan' : 'text-civic-muted hover:bg-civic-raised hover:text-white'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div role="tabpanel">
            {activeTab === 'projects' && <ProjectDetails projects={politician.projects} />}
            {activeTab === 'votes' && <VoteDetails votes={politician.votes} />}
            {activeTab === 'trajectory' && <TrajectoryDetails timeline={politician.timeline} />}
            {activeTab === 'alignment' && (
              affinity
                ? <div className="space-y-4">
                  <p className="rounded-lg border border-civic-green/20 bg-civic-green/5 p-4 text-sm leading-6 text-civic-text">
                    Afinidade demonstrativa: <strong className="text-civic-mint">{affinity.score}%</strong> em {affinity.comparedQuestions} eixos. A comparação descreve proximidade entre respostas, sem recomendar voto.
                  </p>
                  <AxisComparison axes={affinity.axes} title={`Você e ${politician.name}`} />
                </div>
                : <p className="rounded-lg border border-civic-line bg-civic-bg/70 p-4 text-sm leading-6 text-civic-muted">Responda ao quiz de alinhamento para ver uma comparação por eixos com este perfil.</p>
            )}
          </div>

          <button type="button" className="btn btn-primary w-full" onClick={() => onOpenProfile(politician.id)}>
            Abrir perfil completo na página principal
          </button>
          <p className="text-center text-[11px] leading-5 text-civic-muted">
            Perfil, indicadores, atividade e posicionamentos fictícios, incluídos apenas para demonstração.
          </p>
        </div>
      </section>
    </div>,
    document.body,
  )
}

function PoliticianCard({ politician, onOpen }) {
  return (
    <article className="card flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-civic-cyan/50 hover:shadow-glow sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-civic-raised font-semibold text-civic-cyan">
          {politician.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-civic-cyan">{politician.role}</p>
          <h3 className="mt-1 line-clamp-2 font-semibold text-white">{politician.name}</h3>
          <p className="mt-1 text-xs text-civic-muted">{politician.party.acronym} · {politician.party.name}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-civic-muted">
        <MapPin className="h-3.5 w-3.5 text-civic-cyan" aria-hidden="true" />
        Estado: <strong className="text-civic-text">{politician.state} - {stateNames.get(politician.state)}</strong>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-civic-muted">Indicador demonstrativo</span>
          <span className="font-semibold text-civic-mint">{politician.performance}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-civic-raised" role="progressbar" aria-label={`Indicador demonstrativo de ${politician.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={politician.performance}>
          <div className="h-full rounded-full bg-gradient-to-r from-civic-green to-civic-mint" style={{ width: `${politician.performance}%` }} />
        </div>
      </div>

      <div className="mt-4 flex min-h-14 flex-wrap content-start gap-1.5">
        {politician.transparencyBadges.slice(0, 3).map((badge) => (
          <span key={badge} className="inline-flex items-center gap-1 rounded-full border border-civic-green/25 bg-civic-green/5 px-2 py-1 text-[10px] text-civic-mint">
            <BadgeCheck className="h-3 w-3" aria-hidden="true" /> {badge}
          </span>
        ))}
      </div>

      <button type="button" onClick={onOpen} className="btn mt-4 w-full">
        <UserRound className="h-4 w-4" aria-hidden="true" /> Ver perfil
      </button>
    </article>
  )
}

export default function PoliticianHub({ onOpenProfile }) {
  const { data } = useApp()
  const [stateFilter, setStateFilter] = useState('todos')
  const [officeFilter, setOfficeFilter] = useState('todos')
  const [search, setSearch] = useState('')
  const [selectedPolitician, setSelectedPolitician] = useState(null)
  const filteredPoliticians = politicians.filter((politician) => {
    const matchesState = stateFilter === 'todos' || politician.state === stateFilter
    const matchesOffice = officeFilter === 'todos' || politician.office === officeFilter
    const query = search.trim().toLocaleLowerCase('pt-BR')
    const matchesSearch = !query || [
      politician.name,
      politician.party.acronym,
      politician.party.name,
      politician.state,
      stateNames.get(politician.state),
      politician.role,
    ].some((value) => value.toLocaleLowerCase('pt-BR').includes(query))
    return matchesState && matchesOffice && matchesSearch
  })

  return (
    <section className="animate-fade-in space-y-6">
      <header className="card bg-steam-header p-6 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-civic-cyan/30 bg-civic-cyan/10 text-civic-cyan">
          <MapPin className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-civic-mint">Vitrine Cívica · Demonstração</p>
        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Hub Nacional de Políticos</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-civic-text">
          Explore perfis demonstrativos por estado e cargo. Os nomes, partidos, selos e indicadores desta versão são fictícios e não constituem avaliações reais.
        </p>
      </header>

      <section className="card p-5 sm:p-6" aria-label="Filtros de políticos">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <Search className="h-4 w-4 text-civic-cyan" aria-hidden="true" />Encontre um perfil
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="politician-search" className="mb-1.5 block text-xs text-civic-muted">Nome, partido ou cargo</label>
            <input id="politician-search" className="input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar perfil..." />
          </div>
          <div>
            <label htmlFor="state-filter" className="mb-1.5 block text-xs text-civic-muted">Estado (UF)</label>
            <select id="state-filter" className="input" value={stateFilter} onChange={(event) => setStateFilter(event.target.value)}>
              <option value="todos">Todos os estados</option>
              {BRAZIL_UFS.map((state) => <option key={state.uf} value={state.uf}>{state.uf} - {state.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="office-filter" className="mb-1.5 block text-xs text-civic-muted">Cargo</label>
            <select id="office-filter" className="input" value={officeFilter} onChange={(event) => setOfficeFilter(event.target.value)}>
              <option value="todos">Todos os cargos</option>
              {officeOptions.map((office) => <option key={office.value} value={office.value}>{office.label}</option>)}
            </select>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Perfis disponíveis</h2>
        <span className="chip">{filteredPoliticians.length} de {politicians.length}</span>
      </div>

      {filteredPoliticians.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPoliticians.map((politician) => (
            <PoliticianCard key={politician.id} politician={politician} onOpen={() => setSelectedPolitician(politician)} />
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center text-sm text-civic-muted">Nenhum perfil corresponde a esses filtros.</div>
      )}

      <p className="rounded-lg border border-civic-amber/20 bg-civic-amber/5 p-4 text-xs leading-5 text-civic-muted">
        <strong className="text-civic-amber">Nota:</strong> selos e indicadores são elementos visuais fictícios de demonstração. Não verificam antecedentes, presença ou desempenho de pessoas reais.
      </p>

      {selectedPolitician && (
        <PoliticianDetails
          politician={selectedPolitician}
          quizResult={data.viewer.quizResult}
          onClose={() => setSelectedPolitician(null)}
          onOpenProfile={(politicianId) => {
            setSelectedPolitician(null)
            onOpenProfile?.(politicianId)
          }}
        />
      )}
    </section>
  )
}
