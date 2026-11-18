import { useApp } from '../../context/AppContext.jsx'
import Navbar from './Navbar.jsx'

export default function Layout({ children }) {
  const { editMode } = useApp()

  return (
    <div className="flex min-h-screen flex-col bg-civic-bg">
      <Navbar />

      {editMode && (
        <div className="border-b border-civic-green/30 bg-civic-green/10 px-4 py-1.5 text-center text-xs text-civic-mint">
          Modo de edição ativo: você está simulando o político logado. As alterações ficam salvas apenas neste navegador.
        </div>
      )}

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">{children}</main>

      <footer className="border-t border-civic-line py-6 text-center text-xs text-civic-muted">
        Projeto de demonstração. Todos os nomes, partidos e dados são fictícios · Dados salvos no localStorage do seu navegador.
      </footer>
    </div>
  )
}
