import { useState } from 'react'
import {
  Check,
  ChevronDown,
  ChevronUp,
  GitFork,
  GitPullRequest,
  History,
  Star,
} from 'lucide-react'
import { STATUS, TAG_COLORS } from '../../data/data.js'
import { useApp } from '../../context/AppContext.jsx'
import { formatCompact, formatDate, timeAgo } from '../../utils/helpers.js'

const statusClass = {
  em_tramitacao: 'border-civic-cyan/40 bg-civic-cyan/10 text-civic-cyan',
  aprovado: 'border-civic-green/40 bg-civic-green/10 text-civic-mint',
  arquivado: 'border-civic-line bg-civic-raised text-civic-muted',
}

function Readme({ content }) {
  return (
    <div className="space-y-3 text-sm leading-6 text-civic-text">
      {(content || 'Sem documentação disponível.').split('\n').map((line, index) => {
        if (line.startsWith('## ')) return <h4 key={index} className="pt-1 text-base font-semibold text-white">{line.slice(3)}</h4>
        if (line.startsWith('- ')) return <p key={index} className="pl-4 before:mr-2 before:text-civic-cyan before:content-['•']">{line.slice(2)}</p>
        if (!line.trim()) return null
        return <p key={index}>{line}</p>
      })}
    </div>
  )
}

export default function ProjectList() {
  const { data, editMode, toggleStar, updateProjectStatus } = useApp()
  const [selectedId, setSelectedId] = useState(null)
  const [statusFilter, setStatusFilter] = useState('todos')
  const selectedProject = data.projects.find((project) => project.id === selectedId)
  const projects = data.projects.filter((project) => statusFilter === 'todos' || project.status === statusFilter)

  return (
    <section className="animate-fade-in space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Projetos de lei</h2>
          <p className="mt-1 text-sm text-civic-muted">Cada proposta tem seu histórico, documentação e espaço para apoio.</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-civic-muted">
          Filtrar
          <select className="input w-auto py-1.5" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filtrar projetos por status">
            <option value="todos">Todos ({data.projects.length})</option>
            {Object.entries(STATUS).map(([id, status]) => (
              <option key={id} value={id}>{status.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-3">
        {projects.map((project) => {
          const expanded = selectedId === project.id
          const starred = data.viewer.starred.includes(project.id)
          return (
            <article key={project.id} className="card overflow-hidden transition hover:border-civic-cyan/40">
              <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-mono text-xs text-civic-muted">{project.number}</span>
                      <span className={`rounded-full border px-2 py-0.5 text-xs ${statusClass[project.status] || statusClass.arquivado}`}>
                        {STATUS[project.status]?.label || 'Status desconhecido'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(expanded ? null : project.id)}
                      aria-expanded={expanded}
                      className="mt-1 text-left text-lg font-semibold text-civic-cyan hover:underline"
                    >
                      {project.title}
                    </button>
                    <p className="mt-1 text-sm leading-6 text-civic-muted">{project.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="chip border-0" style={{ color: TAG_COLORS[tag], backgroundColor: `${TAG_COLORS[tag]}18` }}>
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: TAG_COLORS[tag] }} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                    {editMode && (
                      <label className="sr-only" htmlFor={`status-${project.id}`}>Alterar status de {project.title}</label>
                    )}
                    {editMode ? (
                      <select
                        id={`status-${project.id}`}
                        className="input w-auto py-1.5 text-xs"
                        value={project.status}
                        onChange={(event) => updateProjectStatus(project.id, event.target.value)}
                      >
                        {Object.entries(STATUS).map(([id, status]) => <option key={id} value={id}>{status.label}</option>)}
                      </select>
                    ) : (
                      <button
                        type="button"
                        className={`btn ${starred ? 'border-civic-amber/50 text-civic-amber' : ''}`}
                        onClick={() => toggleStar(project.id)}
                        aria-pressed={starred}
                        aria-label={`${starred ? 'Remover apoio de' : 'Apoiar'} ${project.title}`}
                      >
                        <Star className={`h-4 w-4 ${starred ? 'fill-current' : ''}`} aria-hidden="true" />
                        {formatCompact(project.stars)}
                      </button>
                    )}
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-civic-line px-2.5 py-1.5 text-xs text-civic-muted" title="Emendas">
                      <GitFork className="h-4 w-4" aria-hidden="true" /> {project.amendments.length}
                    </span>
                    <button type="button" className="btn" onClick={() => setSelectedId(expanded ? null : project.id)} aria-expanded={expanded}>
                      {expanded ? 'Fechar' : 'README'}
                      {expanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-civic-line pt-3 text-xs text-civic-muted">
                  <span><Star className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />{formatCompact(project.stars)} apoios</span>
                  <span><GitPullRequest className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />{project.amendments.length} emendas</span>
                  <span><History className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />Atualizado {timeAgo(project.updatedAt)}</span>
                </div>
              </div>

              {expanded && selectedProject?.id === project.id && (
                <div className="border-t border-civic-line bg-civic-bg/50 p-4 sm:p-6">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                        <span className="font-mono text-sm text-civic-cyan">README.md</span>
                      </h3>
                      <Readme content={project.readme} />
                      <div className="mt-6">
                        <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                          <GitFork className="h-4 w-4 text-civic-cyan" aria-hidden="true" />
                          Emendas ({project.amendments.length})
                        </h4>
                        {project.amendments.length ? (
                          <ul className="space-y-2">
                            {project.amendments.map((amendment) => (
                              <li key={amendment.id} className="rounded-md border border-civic-line bg-civic-surface p-3 text-sm">
                                <div className="flex flex-wrap justify-between gap-1">
                                  <span className="font-medium text-civic-text">{amendment.title}</span>
                                  <span className={amendment.status === 'aceita' ? 'text-civic-mint' : 'text-civic-muted'}>{amendment.status}</span>
                                </div>
                                <p className="mt-1 text-xs text-civic-muted">{amendment.author}</p>
                              </li>
                            ))}
                          </ul>
                        ) : <p className="text-sm text-civic-muted">Ainda não há emendas registradas.</p>}
                      </div>
                    </div>
                    <aside>
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                        <History className="h-4 w-4 text-civic-cyan" aria-hidden="true" /> Histórico
                      </h4>
                      <ol className="space-y-3 border-l border-civic-line pl-4">
                        {project.commits.map((commit) => (
                          <li key={commit.id} className="relative text-sm before:absolute before:-left-[21px] before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-civic-cyan">
                            <p className="text-civic-text">{commit.message}</p>
                            <time className="mt-1 block text-xs text-civic-muted" dateTime={commit.date}>{formatDate(commit.date)}</time>
                          </li>
                        ))}
                      </ol>
                      <div className="mt-5 flex items-center gap-2 text-xs text-civic-muted">
                        <Check className="h-4 w-4 text-civic-green" aria-hidden="true" />
                        Protocolado em {formatDate(project.createdAt)}
                      </div>
                    </aside>
                  </div>
                </div>
              )}
            </article>
          )
        })}
        {!projects.length && <div className="card p-8 text-center text-sm text-civic-muted">Nenhum projeto encontrado neste status.</div>}
      </div>
    </section>
  )
}
