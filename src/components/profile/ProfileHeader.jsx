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
    <section className="card animate-fade-in overflow-hidden">
      <div className="bg-steam-header p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border-4 border-white/10 bg-civic-raised text-3xl font-bold text-white shadow-lg">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={`Avatar de ${profile.name}`} className="h-full w-full rounded-lg object-cover" />
            ) : (
              profile.initials || <UserRound className="h-10 w-10" aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">{profile.name}</h1>
              <span className="text-sm text-civic-cyan">{profile.handle}</span>
            </div>
            <p className="mt-1 text-sm text-civic-text">
              {profile.role} <span className="text-civic-muted">· {profile.house}</span>
            </p>
            <p className="mt-1 text-sm text-civic-muted">
              <span className="font-semibold text-civic-cyan">{profile.party.acronym}</span>
              {' · '}{profile.party.name}{' · Mandato '}{profile.mandate}
            </p>

            <div className="mt-5 max-w-xl">
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-white">Nível {level.level} · {levelTitle(level.level)}</span>
                <span className="text-civic-text">{profile.xp.toLocaleString('pt-BR')} XP · {level.xpForNext - level.xpIntoLevel} XP para o próximo nível</span>
              </div>
              <div
                className="h-2.5 overflow-hidden rounded-full bg-civic-bg/70"
                role="progressbar"
                aria-label="Progresso para o próximo nível"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.floor(level.progress * 100)}
              >
                <div className="h-full rounded-full bg-gradient-to-r from-civic-cyan to-civic-green transition-all" style={{ width: `${level.progress * 100}%` }} />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {badges.map((badge) => {
                const Icon = badgeIcons[badge.icon] || Award
                return (
                  <span
                    key={badge.id}
                    title={`${badge.label}: ${badge.description}`}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${tierStyles[badge.tier] || tierStyles.bronze}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {badge.label}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
        <p className="max-w-3xl text-sm leading-6 text-civic-text">{profile.bio}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-civic-muted sm:justify-end">
          <span><strong className="text-civic-mint">{profile.stats.presencePct}%</strong> presença</span>
          <span><strong className="text-white">{profile.stats.plenaryVotes}</strong> votações</span>
          <span><strong className="text-white">{profile.stats.sessionsAttended}</strong> sessões</span>
        </div>
      </div>
    </section>
  )
}
