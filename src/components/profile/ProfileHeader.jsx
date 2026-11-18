import {
  Award,
  CalendarCheck,
  Cpu,
  Eye,
  MessagesSquare,
  ScrollText,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { levelFromXp, levelTitle } from '../../utils/helpers.js'

const badgeIcons = { ShieldCheck, CalendarCheck, ScrollText, Eye, MessagesSquare, Cpu }
const tierStyles = {
  ouro: 'border-civic-amber/40 bg-civic-amber/10 text-civic-amber',
  prata: 'border-slate-400/40 bg-slate-400/10 text-slate-300',
  bronze: 'border-orange-400/40 bg-orange-400/10 text-orange-300',
}

export default function ProfileHeader() {
  const { data } = useApp()
  const { profile, badges } = data
  const level = levelFromXp(profile.xp)

  return (
    <section className="card animate-fade-in mx-auto w-full max-w-5xl overflow-hidden">
      <div className="bg-steam-header p-6 text-center sm:p-8">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white/10 bg-civic-raised text-4xl font-bold text-white shadow-glow">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={`Avatar de ${profile.name}`} className="h-full w-full rounded-xl object-cover" />
            ) : (
              profile.initials || <UserRound className="h-10 w-10" aria-hidden="true" />
            )}
        </div>
        <div className="mx-auto mt-5 max-w-3xl">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">{profile.name}</h1>
            <span className="text-sm text-civic-cyan">{profile.handle}</span>
          </div>
          <p className="mt-2 text-sm text-civic-text">
            {profile.role} <span className="text-civic-muted">· {profile.house} · {profile.state || 'MA'}</span>
          </p>
          <p className="mt-1 text-sm text-civic-muted">
            <span className="font-semibold text-civic-cyan">{profile.party.acronym}</span>
            {' · '}{profile.party.name}{' · Mandato '}{profile.mandate}
          </p>

          <div className="mx-auto mt-6 max-w-xl">
            <div className="mb-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
              <span className="font-semibold text-white">Nível {level.level} · {levelTitle(level.level)}</span>
              <span className="text-civic-mint">{profile.xp.toLocaleString('pt-BR')} XP · {level.xpForNext - level.xpIntoLevel} XP para o próximo nível</span>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full border border-civic-green/20 bg-civic-bg/80"
              role="progressbar"
              aria-label="Progresso para o próximo nível"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.floor(level.progress * 100)}
            >
              <div className="h-full rounded-full bg-gradient-to-r from-civic-green to-civic-mint shadow-[0_0_14px_rgba(87,171,90,0.5)] transition-all" style={{ width: `${level.progress * 100}%` }} />
            </div>
          </div>

          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 justify-items-center gap-2 sm:flex sm:flex-wrap sm:justify-center">
            {badges.map((badge) => {
              const Icon = badgeIcons[badge.icon] || Award
              return (
                <span
                  key={badge.id}
                  title={`${badge.label}: ${badge.description}`}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium ${tierStyles[badge.tier] || tierStyles.bronze}`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {badge.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6 text-center sm:p-8">
        <p className="mx-auto max-w-3xl text-sm leading-7 text-civic-text">{profile.bio}</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-civic-muted">
          <span><strong className="text-civic-mint">{profile.stats.presencePct}%</strong> presença</span>
          <span><strong className="text-white">{profile.stats.plenaryVotes}</strong> votações</span>
          <span><strong className="text-white">{profile.stats.sessionsAttended}</strong> sessões</span>
        </div>
      </div>
    </section>
  )
}
