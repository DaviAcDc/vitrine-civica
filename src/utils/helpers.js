// Funções utilitárias puras (sem dependência de React).

export const cx = (...classes) => classes.filter(Boolean).join(' ')

export function uid(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`
}

// 'YYYY-MM-DD' no fuso LOCAL (toISOString() usaria UTC e erraria o dia à noite)
export function toISODate(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatDate(iso, options = { day: '2-digit', month: 'short', year: 'numeric' }) {
  return new Date(iso).toLocaleDateString('pt-BR', options)
}

export function timeAgo(iso) {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (minutes < 1) return 'agora mesmo'
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours} h`
  const days = Math.floor(hours / 24)
  if (days < 30) return `há ${days} d`
  return formatDate(iso)
}

export function formatCompact(n = 0) {
  return new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}

// ---------- XP e nível (estilo Steam) ----------
// Nível N começa em 100 * (N-1)^2 XP. Ex.: 7420 XP => nível 9 (6400 a 8100).
export function levelFromXp(xp = 0) {
  const level = Math.floor(Math.sqrt(xp / 100)) + 1
  const floor = 100 * (level - 1) ** 2
  const ceil = 100 * level ** 2
  return {
    level,
    floor,
    ceil,
    xpIntoLevel: xp - floor,
    xpForNext: ceil - floor,
    progress: (xp - floor) / (ceil - floor), // 0..1
  }
}

export function levelTitle(level) {
  if (level >= 15) return 'Lenda Cívica'
  if (level >= 10) return 'Referência Legislativa'
  if (level >= 5) return 'Representante Ativo'
  return 'Iniciante Cívico'
}

// ---------- projetos e atividade ----------
export const forkCount = (project) => project.amendments?.length ?? 0

export function activityStats(activity = {}) {
  const entries = Object.entries(activity)
  const total = entries.reduce((sum, [, day]) => sum + day.total, 0)
  const best = entries.reduce((top, [date, day]) => (day.total > (top?.total ?? 0) ? { date, total: day.total } : top), null)
  return { total, activeDays: entries.length, bestDay: best }
}
