import { cx } from '../../utils/helpers.js'

// tabs: [{ id, label, icon: LucideIcon, count? }]
export default function Tabs({ tabs, active, onChange, ariaLabel = 'Seções do perfil' }) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="flex gap-1 overflow-x-auto border-b border-civic-line">
      {tabs.map(({ id, label, icon: Icon, count }) => {
        const isActive = id === active
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={cx(
              '-mb-px flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition',
              isActive
                ? 'border-civic-cyan text-white'
                : 'border-transparent text-civic-muted hover:border-civic-line hover:text-civic-text',
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
            {count != null && (
              <span className="rounded-full bg-civic-raised px-2 py-0.5 text-xs text-civic-text">{count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
