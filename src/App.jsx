import { Compass, FolderGit2, LayoutDashboard, MessageSquare, Milestone, Sparkles, UserRound } from 'lucide-react'
import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext.jsx'
import Layout from './components/layout/Layout.jsx'
import Tabs from './components/layout/Tabs.jsx'
import ProfileHeader from './components/profile/ProfileHeader.jsx'
import ContributionHeatmap from './components/heatmap/ContributionHeatmap.jsx'
import ProjectList from './components/projects/ProjectList.jsx'
import Timeline from './components/timeline/Timeline.jsx'
import Feed from './components/feed/Feed.jsx'
import EditDashboard from './components/dashboard/EditDashboard.jsx'
import PoliticianHub from './components/hub/PoliticianHub.jsx'
import PoliticalQuiz from './components/quiz/PoliticalQuiz.jsx'

function CivicHub() {
  const { data, editMode, selectPolitician } = useApp()
  const [activeSection, setActiveSection] = useState('hub')
  const [activeProfileTab, setActiveProfileTab] = useState('projetos')
  const openPoliticianProfile = (politicianId) => {
    selectPolitician(politicianId)
    setActiveProfileTab('projetos')
    setActiveSection('perfil')
  }

  const mainTabs = [
    { id: 'hub', label: 'Explorar Hub', icon: Compass },
    { id: 'quiz', label: 'Descubra seu alinhamento', icon: Sparkles },
    { id: 'perfil', label: 'Perfil político', icon: UserRound },
  ]
  const profileTabs = [
    { id: 'projetos', label: 'Projetos', icon: FolderGit2, count: data.projects.length },
    { id: 'feed', label: 'Atualizações', icon: MessageSquare, count: data.posts.length },
    { id: 'trajetoria', label: 'Trajetória', icon: Milestone },
    ...(editMode ? [{ id: 'painel', label: 'Painel do político', icon: LayoutDashboard }] : []),
  ]
  const currentProfileTab = profileTabs.some((tab) => tab.id === activeProfileTab) ? activeProfileTab : 'projetos'

  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <Tabs
          tabs={mainTabs}
          active={activeSection}
          onChange={setActiveSection}
          ariaLabel="Navegação principal do Hub Cívico"
        />

        <div role="tabpanel">
          {activeSection === 'hub' && <PoliticianHub onOpenProfile={openPoliticianProfile} />}
          {activeSection === 'quiz' && <PoliticalQuiz />}
          {activeSection === 'perfil' && (
            <div className="space-y-6">
              <ProfileHeader />
              <ContributionHeatmap />
              <Tabs
                tabs={profileTabs}
                active={currentProfileTab}
                onChange={setActiveProfileTab}
                ariaLabel="Seções do perfil político"
              />
              <div role="tabpanel" className="space-y-5">
                {currentProfileTab === 'projetos' && <ProjectList />}
                {currentProfileTab === 'feed' && <Feed />}
                {currentProfileTab === 'trajetoria' && <Timeline />}
                {currentProfileTab === 'painel' && <EditDashboard />}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default function App() {
  return (
    <AppProvider>
      <CivicHub />
    </AppProvider>
  )
}
