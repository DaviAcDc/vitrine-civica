import { FolderGit2, LayoutDashboard, MessageSquare, Milestone } from 'lucide-react'
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

function ProfilePage() {
  const { data, editMode } = useApp()
  const [activeTab, setActiveTab] = useState('projetos')

  const tabs = [
    { id: 'projetos', label: 'Projetos', icon: FolderGit2, count: data.projects.length },
    { id: 'feed', label: 'Atualizações', icon: MessageSquare, count: data.posts.length },
    { id: 'trajetoria', label: 'Trajetória', icon: Milestone },
    // a aba do painel só existe no modo de edição
    ...(editMode ? [{ id: 'painel', label: 'Painel do político', icon: LayoutDashboard }] : []),
  ]

  // se o modo de edição for desligado estando no painel, cai em "Projetos"
  const currentTab = tabs.some((t) => t.id === activeTab) ? activeTab : 'projetos'

  return (
    <Layout>
      <ProfileHeader />
      <ContributionHeatmap />
      <Tabs tabs={tabs} active={currentTab} onChange={setActiveTab} />
      <div role="tabpanel" className="space-y-4">
        {currentTab === 'projetos' && <ProjectList />}
        {currentTab === 'feed' && <Feed />}
        {currentTab === 'trajetoria' && <Timeline />}
        {currentTab === 'painel' && <EditDashboard />}
      </div>
    </Layout>
  )
}

export default function App() {
  return (
    <AppProvider>
      <ProfilePage />
    </AppProvider>
  )
}
