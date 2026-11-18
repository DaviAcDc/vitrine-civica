import { Activity } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { activityStats, toISODate } from '../../utils/helpers.js'

const levelClass = ['bg-heat-0', 'bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4']
const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

function buildWeeks(activity) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const firstDay = new Date(today)
  firstDay.setDate(today.getDate() - 364)
  firstDay.setDate(firstDay.getDate() - firstDay.getDay())
  const weeks = []

  for (let weekStart = new Date(firstDay); weekStart <= today; weekStart.setDate(weekStart.getDate() + 7)) {
    const week = []
    for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + dayOffset)
      const key = toISODate(date)
      week.push(date > today ? null : { date, key, entry: activity[key] })
    }
    weeks.push(week)
  }
  return weeks
}

function activityLevel(total) {
  if (!total) return 0
  if (total <= 2) return 1
  if (total <= 4) return 2
  if (total <= 7) return 3
  return 4
}

export default function ContributionHeatmap() {
  const { data } = useApp()
  const weeks = buildWeeks(data.activity)
  const stats = activityStats(data.activity)

  return (
    <section className="card animate-fade-in p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Activity className="h-5 w-5 text-civic-cyan" aria-hidden="true" />
            Atividade cívica
          </h2>
          <p className="mt-1 text-sm text-civic-muted">
            <strong className="text-civic-text">{stats.total}</strong> contribuições nos últimos 365 dias
            <span className="mx-1.5">·</span>
            <strong className="text-civic-text">{stats.activeDays}</strong> dias ativos
          </p>
        </div>
        {stats.bestDay && (
          <p className="text-xs text-civic-muted">
            Dia mais ativo: <span className="text-civic-text">{new Date(`${stats.bestDay.date}T12:00:00`).toLocaleDateString('pt-BR')}</span>
            {' '}({stats.bestDay.total} atividades)
          </p>
        )}
      </div>

      <div className="mt-5 overflow-x-auto pb-2">
        <div className="min-w-[760px]">
          <div className="flex gap-1">
            <div className="grid w-5 shrink-0 grid-rows-7 gap-1 text-[10px] text-civic-muted">
              {weekdays.map((day, index) => (
                <span key={`${day}-${index}`} className="flex h-3 items-center">{index % 2 === 1 ? day : ''}</span>
              ))}
            </div>
            <div className="grid flex-1 grid-flow-col grid-rows-7 gap-1">
              {weeks.flatMap((week, weekIndex) => week.map((cell, dayIndex) => {
                if (!cell) return <span key={`empty-${weekIndex}-${dayIndex}`} className="h-3 w-3" />
                const total = cell.entry?.total || 0
                const level = activityLevel(total)
                const dateLabel = cell.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
                const detail = cell.entry
                  ? ` · ${cell.entry.protocolo} projetos, ${cell.entry.voto} votações, ${cell.entry.atualizacao} atualizações, ${cell.entry.prestacao} prestações`
                  : ''
                return (
                  <span
                    key={cell.key}
                    title={`${dateLabel}: ${total} atividade${total === 1 ? '' : 's'}${detail}`}
                    aria-label={`${dateLabel}: ${total} atividades${detail}`}
                    className={`h-3 w-3 rounded-[2px] ${levelClass[level]}`}
                  />
                )
              }))}
            </div>
          </div>
          <div className="ml-6 mt-1 flex h-4 justify-between text-[10px] text-civic-muted">
            {weeks.map((week, index) => {
              const first = week.find(Boolean)
              const previous = weeks[index - 1]?.find(Boolean)
              return first && (first.date.getDate() <= 7 || first.date.getMonth() !== previous?.date.getMonth())
                ? <span key={index}>{first.date.toLocaleDateString('pt-BR', { month: 'short' })}</span>
                : <span key={index} aria-hidden="true" />
            })}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-civic-muted">
        <p>Projetos protocolados · votações · atualizações · prestações de contas</p>
        <div className="flex items-center gap-1.5" aria-label="Legenda de atividade">
          <span>Menos</span>
          {levelClass.map((className, index) => <span key={index} className={`h-3 w-3 rounded-[2px] ${className}`} />)}
          <span>Mais</span>
        </div>
      </div>
    </section>
  )
}
