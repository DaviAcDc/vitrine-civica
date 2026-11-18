function formatPosition(value) {
  return value > 0 ? `+${value}` : String(value)
}

export default function AxisComparison({ axes, title }) {
  if (!axes?.length) {
    return <p className="text-sm text-civic-muted">Não há eixos comparáveis disponíveis.</p>
  }

  return (
    <section className="space-y-4" aria-label={title || 'Comparação de posicionamentos por eixo'}>
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
      <div className="space-y-4">
        {axes.map((axis) => (
          <div key={axis.id} className="rounded-xl border border-civic-line bg-civic-bg/70 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-sm font-semibold text-civic-text">{axis.label}</h4>
              <span className="text-xs text-civic-muted">{axis.similarity}% de proximidade neste eixo</span>
            </div>
            <div className="mt-3 flex justify-between gap-3 text-[10px] text-civic-muted">
              <span>{axis.leftLabel}</span>
              <span className="text-right">{axis.rightLabel}</span>
            </div>
            <div
              className="relative mt-1 h-8 rounded-full border border-white/5 bg-gradient-to-r from-blue-500/30 via-slate-500/20 to-civic-green/40"
              role="img"
              aria-label={`${axis.label}: sua posição ${formatPosition(axis.userValue)}, posição do perfil ${formatPosition(axis.politicianValue)}`}
            >
              <span
                className="absolute top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-sky-400 shadow"
                style={{ left: `${((axis.userValue + 2) / 4) * 100}%` }}
              />
              <span
                className="absolute bottom-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-civic-green shadow"
                style={{ left: `${((axis.politicianValue + 2) / 4) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <span className="inline-flex items-center gap-1.5 text-civic-muted">
                <span className="h-2 w-2 rounded-full bg-sky-400" /> Você: <strong className="text-white">{formatPosition(axis.userValue)}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-civic-muted">
                <span className="h-2 w-2 rounded-full bg-civic-green" /> Perfil: <strong className="text-white">{formatPosition(axis.politicianValue)}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
