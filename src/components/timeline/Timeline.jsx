import { BriefcaseBusiness, GraduationCap, Landmark, Milestone } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const sections = [
  { key: 'mandates', title: 'Mandatos e serviço público', icon: Landmark, accent: 'text-civic-cyan' },
  { key: 'experience', title: 'Experiência profissional', icon: BriefcaseBusiness, accent: 'text-civic-mint' },
  { key: 'education', title: 'Formação', icon: GraduationCap, accent: 'text-civic-amber' },
]

function period(item) {
  return `${item.start} — ${item.end ?? 'presente'}`
}

export default function Timeline() {
  const { data } = useApp()

  return (
    <section className="animate-fade-in space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
          <Milestone className="h-5 w-5 text-civic-cyan" aria-hidden="true" />
          Trajetória
        </h2>
        <p className="mt-1 text-sm text-civic-muted">Mandatos, experiência profissional e formação acadêmica.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {sections.map(({ key, title, icon: Icon, accent }) => (
          <section key={key} className="card p-5">
            <h3 className="mb-5 flex items-center gap-2 font-semibold text-white">
              <Icon className={`h-5 w-5 ${accent}`} aria-hidden="true" />
              {title}
            </h3>
            <ol className="space-y-5 border-l border-civic-line pl-5">
              {data.timeline[key].map((item) => (
                <li key={item.id} className="relative before:absolute before:-left-[25px] before:top-1.5 before:h-2.5 before:w-2.5 before:rounded-full before:border-2 before:border-civic-surface before:bg-civic-cyan">
                  <p className="text-xs font-medium text-civic-cyan">{period(item)}</p>
                  <h4 className="mt-1 font-semibold text-white">{item.title}</h4>
                  <p className="mt-0.5 text-sm text-civic-muted">{item.organization}</p>
                  {item.description && <p className="mt-2 text-sm leading-5 text-civic-text">{item.description}</p>}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </section>
  )
}
