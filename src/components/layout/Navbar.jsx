import { Eye, Landmark, Pencil, RotateCcw } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { cx } from '../../utils/helpers.js'

export default function Navbar() {
  const { data, editMode, toggleEditMode, resetData } = useApp()

  const handleReset = () => {
    if (window.confirm('Restaurar os dados de demonstração? Projetos, posts e comentários criados por você serão apagados.')) {
      resetData()
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-civic-line bg-civic-nav/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4">
        <a href="/" className="flex items-center gap-2 font-semibold text-white">
          <Landmark className="h-5 w-5 text-civic-cyan" aria-hidden="true" />
          <span>
            Vitrine<span className="text-civic-cyan">Cívica</span>
          </span>
        </a>
        <span className="hidden text-sm text-civic-muted sm:inline">/ {data.profile.handle}</span>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" className="btn" onClick={handleReset} title="Restaurar dados de demonstração">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">Resetar demo</span>
          </button>

          <button
            type="button"
            role="switch"
            aria-checked={editMode}
            onClick={toggleEditMode}
            className={cx(
              'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-civic-cyan/60',
              editMode
                ? 'border-civic-green/60 bg-civic-green/15 text-civic-mint'
                : 'border-civic-line bg-civic-raised text-civic-text hover:border-civic-cyan/60',
            )}
          >
            {editMode ? <Pencil className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            <span className="hidden sm:inline">{editMode ? 'Editando como político' : 'Visão do cidadão'}</span>
            <span className={cx('relative h-4 w-7 rounded-full transition', editMode ? 'bg-civic-green' : 'bg-civic-line')}>
              <span
                className={cx(
                  'absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all',
                  editMode ? 'left-3.5' : 'left-0.5',
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
