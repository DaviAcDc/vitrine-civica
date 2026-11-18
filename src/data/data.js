// =============================================================================
// data.js - Dados MOCKADOS e FICTÍCIOS da Vitrine Cívica
// -----------------------------------------------------------------------------
// Nenhuma pessoa, partido ou projeto aqui é real.
// - Configurações (STATUS, TAGS, REACTIONS, XP_RULES...) no topo.
// - Entidades (profile, badges, projects, timeline, posts) no meio.
// - createInitialData() monta o "banco" inicial que o AppContext persiste
//   no localStorage. Mudou a estrutura? Incremente SCHEMA_VERSION.
// =============================================================================
import { toISODate } from '../utils/helpers.js'

export const SCHEMA_VERSION = 1
export const STORAGE_KEY = 'vitrine-civica:v1'

// ---------- utilitários locais de data ----------
const daysAgo = (n, hour = 10) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}
const commit = (id, days, kind, message) => ({ id, date: daysAgo(days), kind, message })
const amendment = (id, author, title, status) => ({ id, author, title, status })

// =============================================================================
// CONFIGURAÇÕES
// =============================================================================

export const STATUS = {
  em_tramitacao: { label: 'Em tramitação', tone: 'cyan' },
  aprovado: { label: 'Aprovado', tone: 'green' },
  arquivado: { label: 'Arquivado', tone: 'gray' },
}

export const TAGS = [
  'Saúde',
  'Educação',
  'Tecnologia',
  'Meio Ambiente',
  'Transparência',
  'Segurança',
  'Economia',
  'Mobilidade',
]

// Cor de cada tag (equivalente às "linguagens" do GitHub)
export const TAG_COLORS = {
  'Saúde': '#f78166',
  'Educação': '#e3b341',
  'Tecnologia': '#66c0f4',
  'Meio Ambiente': '#57ab5a',
  'Transparência': '#b083f0',
  'Segurança': '#e5534b',
  'Economia': '#39d0d8',
  'Mobilidade': '#f69d50',
}

export const REACTIONS = [
  { id: 'apoio', emoji: '👍', label: 'Apoio' },
  { id: 'aplauso', emoji: '👏', label: 'Aplauso' },
  { id: 'ideia', emoji: '💡', label: 'Boa ideia' },
  { id: 'duvida', emoji: '🤔', label: 'Tenho dúvidas' },
]

// Tipos de atividade do heatmap
export const ACTIVITY_TYPES = {
  protocolo: { label: 'Projetos protocolados' },
  voto: { label: 'Votações em plenário' },
  atualizacao: { label: 'Atualizações de propostas' },
  prestacao: { label: 'Prestações de contas' },
}

// Tipos de post do feed e qual atividade do heatmap cada um acende
export const POST_TYPES = {
  atualizacao: { label: 'Atualização', activity: 'atualizacao' },
  prestacao: { label: 'Prestação de contas', activity: 'prestacao' },
  votacao: { label: 'Votação', activity: 'voto' },
}

// XP ganho em cada ação do modo de edição
export const XP_RULES = {
  novo_projeto: 50,
  atualizacao_status: 20,
  novo_post: 10,
}

// Quem comenta quando o modo de edição está desligado
export const VIEWER = { id: 'cidadao-demo', name: 'Cidadão Demo', initials: 'CD' }

// =============================================================================
// PERFIL E BADGES
// (o campo "icon" é o NOME de um ícone do Lucide; o Passo 2 mapeia nome -> componente)
// =============================================================================

export const profile = {
  id: 'helena-marques',
  name: 'Helena Marques Duarte',
  handle: '@helenamarques',
  role: 'Deputada Estadual',
  state: 'MA',
  house: 'Assembleia Legislativa (fictícia)',
  party: { acronym: 'PHC', name: 'Partido Horizonte Cívico (fictício)' },
  avatarUrl: null, // sem imagem: o Avatar usa as iniciais
  initials: 'HM',
  mandate: '2023 — presente',
  bio: 'Médica sanitarista e deputada estadual. Acredito que cada real público deve deixar rastro e cada projeto merece uma explicação em linguagem simples. Aqui você acompanha o que eu protocolo, voto e entrego, e pode cobrar.',
  xp: 7420,
  stats: { presencePct: 100, plenaryVotes: 412, sessionsAttended: 187 },
}

export const badges = [
  { id: 'ficha-limpa', label: 'Ficha Limpa', description: 'Certidões negativas atualizadas e sem condenações.', icon: 'ShieldCheck', tier: 'ouro', earnedAt: '2023-03-01' },
  { id: 'presenca-100', label: '100% Presença', description: 'Presente em todas as sessões plenárias do período.', icon: 'CalendarCheck', tier: 'ouro', earnedAt: '2024-12-20' },
  { id: 'autora-lei', label: 'Autora de Lei Aprovada', description: 'Teve projetos de lei aprovados e sancionados.', icon: 'ScrollText', tier: 'prata', earnedAt: '2025-06-10' },
  { id: 'contas-em-dia', label: 'Contas em Dia', description: 'Prestou contas todos os meses, com comprovantes públicos.', icon: 'Eye', tier: 'prata', earnedAt: '2025-09-05' },
  { id: 'ouvidora', label: 'Ouvidora Ativa', description: 'Respondeu a mais de 100 comentários de cidadãos.', icon: 'MessagesSquare', tier: 'bronze', earnedAt: '2026-02-14' },
  { id: 'pioneira-digital', label: 'Pioneira Digital', description: 'Primeira do estado a publicar a agenda e os gastos em formato aberto.', icon: 'Cpu', tier: 'bronze', earnedAt: '2026-05-02' },
]

// Perfis de demonstração. Todos os nomes, partidos, indicadores e posicionamentos
// são fictícios e não representam pessoas ou mandatos reais.
export const BRAZIL_UFS = [
  { uf: 'AC', name: 'Acre' },
  { uf: 'AL', name: 'Alagoas' },
  { uf: 'AP', name: 'Amapá' },
  { uf: 'AM', name: 'Amazonas' },
  { uf: 'BA', name: 'Bahia' },
  { uf: 'CE', name: 'Ceará' },
  { uf: 'DF', name: 'Distrito Federal' },
  { uf: 'ES', name: 'Espírito Santo' },
  { uf: 'GO', name: 'Goiás' },
  { uf: 'MA', name: 'Maranhão' },
  { uf: 'MT', name: 'Mato Grosso' },
  { uf: 'MS', name: 'Mato Grosso do Sul' },
  { uf: 'MG', name: 'Minas Gerais' },
  { uf: 'PA', name: 'Pará' },
  { uf: 'PB', name: 'Paraíba' },
  { uf: 'PR', name: 'Paraná' },
  { uf: 'PE', name: 'Pernambuco' },
  { uf: 'PI', name: 'Piauí' },
  { uf: 'RJ', name: 'Rio de Janeiro' },
  { uf: 'RN', name: 'Rio Grande do Norte' },
  { uf: 'RS', name: 'Rio Grande do Sul' },
  { uf: 'RO', name: 'Rondônia' },
  { uf: 'RR', name: 'Roraima' },
  { uf: 'SC', name: 'Santa Catarina' },
  { uf: 'SP', name: 'São Paulo' },
  { uf: 'SE', name: 'Sergipe' },
  { uf: 'TO', name: 'Tocantins' },
]

const politicianProfiles = [
  {
    id: 'helena-marques',
    name: profile.name,
    initials: profile.initials,
    role: profile.role,
    office: 'deputado-estadual',
    state: 'MA',
    party: profile.party,
    bio: profile.bio,
    performance: 92,
    transparencyBadges: ['Ficha Limpa', '100% Presença', 'Contas em Dia'],
    positions: {
      saude_publica: -2,
      parcerias_servicos: 0,
      responsabilidade_fiscal: 0,
      protecao_social: -1,
      tributacao: -1,
      meio_ambiente: -1,
      transparencia: -2,
      participacao: -2,
    },
  },
  {
    id: 'caio-nunes',
    name: 'Caio Nunes Ferreira',
    initials: 'CN',
    role: 'Deputado Federal',
    office: 'deputado-federal',
    state: 'MA',
    party: { acronym: 'PVR', name: 'Partido Verde Regional (fictício)' },
    bio: 'Engenheiro e representante fictício com foco em infraestrutura, desenvolvimento regional e prestação de contas.',
    performance: 84,
    transparencyBadges: ['Dados Abertos', 'Presença em Dia'],
    positions: {
      saude_publica: -1,
      parcerias_servicos: 1,
      responsabilidade_fiscal: 1,
      protecao_social: 0,
      tributacao: 1,
      meio_ambiente: 0,
      transparencia: -1,
      participacao: 0,
    },
  },
  {
    id: 'mariana-lopes',
    name: 'Mariana Lopes Ribeiro',
    initials: 'ML',
    role: 'Deputada Federal',
    office: 'deputado-federal',
    state: 'SP',
    party: { acronym: 'PCC', name: 'Partido Caminhos Comuns (fictício)' },
    bio: 'Pesquisadora e representante fictícia com atuação em educação, políticas sociais e transparência pública.',
    performance: 88,
    transparencyBadges: ['Contas em Dia', 'Ouvidoria Ativa'],
    positions: {
      saude_publica: -2,
      parcerias_servicos: -1,
      responsabilidade_fiscal: -1,
      protecao_social: -2,
      tributacao: -1,
      meio_ambiente: -1,
      transparencia: -2,
      participacao: -1,
    },
  },
  {
    id: 'andre-vasconcelos',
    name: 'André Vasconcelos Prado',
    initials: 'AV',
    role: 'Senador',
    office: 'senador',
    state: 'RJ',
    party: { acronym: 'URB', name: 'União Renovadora Brasileira (fictícia)' },
    bio: 'Gestor público e representante fictício interessado em equilíbrio fiscal, infraestrutura e avaliação de políticas.',
    performance: 79,
    transparencyBadges: ['Agenda Pública', 'Votações Registradas'],
    positions: {
      saude_publica: 0,
      parcerias_servicos: 2,
      responsabilidade_fiscal: 2,
      protecao_social: 1,
      tributacao: 2,
      meio_ambiente: 1,
      transparencia: 0,
      participacao: 1,
    },
  },
  {
    id: 'beatriz-almeida',
    name: 'Beatriz Almeida Costa',
    initials: 'BA',
    role: 'Governadora',
    office: 'governador',
    state: 'PR',
    party: { acronym: 'FPP', name: 'Frente pelo Progresso Público (fictícia)' },
    bio: 'Administradora e gestora fictícia com foco em serviços públicos, desenvolvimento sustentável e participação local.',
    performance: 90,
    transparencyBadges: ['Compras Abertas', 'Relatórios em Dia', 'Agenda Pública'],
    positions: {
      saude_publica: -1,
      parcerias_servicos: 0,
      responsabilidade_fiscal: 0,
      protecao_social: -1,
      tributacao: 0,
      meio_ambiente: -2,
      transparencia: -2,
      participacao: -1,
    },
  },
  {
    id: 'lucas-monteiro',
    name: 'Lucas Monteiro Alves',
    initials: 'LM',
    role: 'Deputado Estadual',
    office: 'deputado-estadual',
    state: 'RJ',
    party: { acronym: 'MCD', name: 'Movimento Cívico Democrático (fictício)' },
    bio: 'Professor e representante fictício com propostas sobre formação profissional e simplificação de serviços.',
    performance: 73,
    transparencyBadges: ['Presença em Dia'],
    positions: {
      saude_publica: 1,
      parcerias_servicos: 1,
      responsabilidade_fiscal: 1,
      protecao_social: 1,
      tributacao: 1,
      meio_ambiente: 0,
      transparencia: 1,
      participacao: 2,
    },
  },
]

const additionalPoliticians = [
  {
    id: 'ana-clara-siqueira',
    name: 'Ana Clara Siqueira',
    initials: 'AS',
    role: 'Governadora',
    office: 'governador',
    state: 'AC',
    party: { acronym: 'NVA', name: 'Nova Aliança (fictícia)' },
    bio: 'Perfil fictício de demonstração com propostas sobre saúde regional e serviços públicos.',
    performance: 81,
    transparencyBadges: ['Relatórios em Dia', 'Agenda Pública'],
    alignmentProfile: 'publicServices',
    featuredArea: 'Saúde regional',
  },
  {
    id: 'rafael-monteiro',
    name: 'Rafael Monteiro Barros',
    initials: 'RM',
    role: 'Deputado Estadual',
    office: 'deputado-estadual',
    state: 'AL',
    party: { acronym: 'PCA', name: 'Partido Cidadania Ativa (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre educação e participação cidadã.',
    performance: 76,
    transparencyBadges: ['Presença em Dia', 'Votações Registradas'],
    alignmentProfile: 'participatory',
    featuredArea: 'Educação',
  },
  {
    id: 'luana-cardoso',
    name: 'Luana Cardoso Vale',
    initials: 'LC',
    role: 'Senadora',
    office: 'senador',
    state: 'AP',
    party: { acronym: 'MCP', name: 'Movimento Cívico Popular (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre proteção ambiental e transparência.',
    performance: 87,
    transparencyBadges: ['Dados Abertos', 'Contas em Dia'],
    alignmentProfile: 'environmental',
    featuredArea: 'Meio ambiente',
  },
  {
    id: 'pedro-matos',
    name: 'Pedro Henrique Matos',
    initials: 'PM',
    role: 'Deputado Estadual',
    office: 'deputado-estadual',
    state: 'AM',
    party: { acronym: 'RDA', name: 'Rede de Desenvolvimento Amazônico (fictícia)' },
    bio: 'Perfil fictício de demonstração com propostas sobre mobilidade e desenvolvimento regional.',
    performance: 78,
    transparencyBadges: ['Agenda Pública', 'Presença em Dia'],
    alignmentProfile: 'balanced',
    featuredArea: 'Mobilidade',
  },
  {
    id: 'joana-reis',
    name: 'Joana Reis de Carvalho',
    initials: 'JR',
    role: 'Deputada Federal',
    office: 'deputado-federal',
    state: 'BA',
    party: { acronym: 'PVS', name: 'Partido Vida Sustentável (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre proteção social e desenvolvimento sustentável.',
    performance: 89,
    transparencyBadges: ['Contas em Dia', 'Ouvidoria Ativa'],
    alignmentProfile: 'environmental',
    featuredArea: 'Proteção social',
  },
  {
    id: 'eduardo-lima',
    name: 'Eduardo Nogueira Lima',
    initials: 'EL',
    role: 'Governador',
    office: 'governador',
    state: 'CE',
    party: { acronym: 'FCD', name: 'Frente Cívica pelo Desenvolvimento (fictícia)' },
    bio: 'Perfil fictício de demonstração com propostas sobre orçamento e serviços públicos.',
    performance: 83,
    transparencyBadges: ['Compras Abertas', 'Relatórios em Dia'],
    alignmentProfile: 'balanced',
    featuredArea: 'Serviços públicos',
  },
  {
    id: 'marina-queiroz',
    name: 'Marina Queiroz Prado',
    initials: 'MQ',
    role: 'Senadora',
    office: 'senador',
    state: 'DF',
    party: { acronym: 'PDI', name: 'Partido Democracia Inclusiva (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre transparência e participação social.',
    performance: 91,
    transparencyBadges: ['Dados Abertos', 'Agenda Pública', 'Contas em Dia'],
    alignmentProfile: 'participatory',
    featuredArea: 'Transparência',
  },
  {
    id: 'felipe-brandao',
    name: 'Felipe Costa Brandão',
    initials: 'FB',
    role: 'Deputado Estadual',
    office: 'deputado-estadual',
    state: 'ES',
    party: { acronym: 'PMP', name: 'Partido Modernização Pública (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre inovação e avaliação de políticas.',
    performance: 74,
    transparencyBadges: ['Votações Registradas'],
    alignmentProfile: 'market',
    featuredArea: 'Inovação',
  },
  {
    id: 'renata-moura',
    name: 'Renata Alves Moura',
    initials: 'RA',
    role: 'Deputada Federal',
    office: 'deputado-federal',
    state: 'GO',
    party: { acronym: 'PPR', name: 'Partido Progresso Regional (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre educação e desenvolvimento regional.',
    performance: 80,
    transparencyBadges: ['Relatórios em Dia', 'Presença em Dia'],
    alignmentProfile: 'balanced',
    featuredArea: 'Educação',
  },
  {
    id: 'otavio-falcao',
    name: 'Otávio Mendes Falcão',
    initials: 'OF',
    role: 'Governador',
    office: 'governador',
    state: 'MT',
    party: { acronym: 'LPR', name: 'Liga pelo Progresso Regional (fictícia)' },
    bio: 'Perfil fictício de demonstração com propostas sobre infraestrutura e equilíbrio orçamentário.',
    performance: 77,
    transparencyBadges: ['Agenda Pública', 'Votações Registradas'],
    alignmentProfile: 'market',
    featuredArea: 'Infraestrutura',
  },
  {
    id: 'camila-freire',
    name: 'Camila Duarte Freire',
    initials: 'CF',
    role: 'Deputada Estadual',
    office: 'deputado-estadual',
    state: 'MS',
    party: { acronym: 'MCA', name: 'Movimento Cidadão Aberto (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre saúde, educação e fiscalização.',
    performance: 86,
    transparencyBadges: ['Contas em Dia', 'Ouvidoria Ativa'],
    alignmentProfile: 'publicServices',
    featuredArea: 'Saúde',
  },
  {
    id: 'bruno-lessa',
    name: 'Bruno Azevedo Lessa',
    initials: 'BL',
    role: 'Deputado Federal',
    office: 'deputado-federal',
    state: 'MG',
    party: { acronym: 'PES', name: 'Partido Equilíbrio e Serviço (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre emprego e modernização de serviços.',
    performance: 82,
    transparencyBadges: ['Dados Abertos', 'Presença em Dia'],
    alignmentProfile: 'market',
    featuredArea: 'Emprego',
  },
  {
    id: 'vitoria-paiva',
    name: 'Vitória Ramos Paiva',
    initials: 'VP',
    role: 'Governadora',
    office: 'governador',
    state: 'PA',
    party: { acronym: 'FPA', name: 'Frente Pública Amazônica (fictícia)' },
    bio: 'Perfil fictício de demonstração com propostas sobre meio ambiente e serviços regionais.',
    performance: 90,
    transparencyBadges: ['Compras Abertas', 'Dados Abertos'],
    alignmentProfile: 'environmental',
    featuredArea: 'Meio ambiente',
  },
  {
    id: 'daniela-melo',
    name: 'Daniela Tavares Melo',
    initials: 'DM',
    role: 'Deputada Estadual',
    office: 'deputado-estadual',
    state: 'PB',
    party: { acronym: 'PCC', name: 'Partido Cidadania e Cuidado (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre proteção social e participação comunitária.',
    performance: 85,
    transparencyBadges: ['Ouvidoria Ativa', 'Agenda Pública'],
    alignmentProfile: 'participatory',
    featuredArea: 'Proteção social',
  },
  {
    id: 'marcelo-nobrega',
    name: 'Marcelo Gomes Nóbrega',
    initials: 'MN',
    role: 'Deputado Federal',
    office: 'deputado-federal',
    state: 'PE',
    party: { acronym: 'PRC', name: 'Partido Renovação Cidadã (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre mobilidade e transparência.',
    performance: 75,
    transparencyBadges: ['Votações Registradas', 'Relatórios em Dia'],
    alignmentProfile: 'balanced',
    featuredArea: 'Mobilidade',
  },
  {
    id: 'larissa-fontes',
    name: 'Larissa Bezerra Fontes',
    initials: 'LF',
    role: 'Deputada Estadual',
    office: 'deputado-estadual',
    state: 'PI',
    party: { acronym: 'PDS', name: 'Partido Desenvolvimento e Serviço (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre saúde regional e educação pública.',
    performance: 88,
    transparencyBadges: ['Contas em Dia', 'Presença em Dia'],
    alignmentProfile: 'publicServices',
    featuredArea: 'Saúde regional',
  },
  {
    id: 'ricardo-peixoto',
    name: 'Ricardo Dantas Peixoto',
    initials: 'RP',
    role: 'Governador',
    office: 'governador',
    state: 'RN',
    party: { acronym: 'PRA', name: 'Partido Regional Aberto (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre orçamento e modernização administrativa.',
    performance: 72,
    transparencyBadges: ['Agenda Pública'],
    alignmentProfile: 'market',
    featuredArea: 'Gestão pública',
  },
  {
    id: 'isabela-leal',
    name: 'Isabela Martins Leal',
    initials: 'IL',
    role: 'Deputada Federal',
    office: 'deputado-federal',
    state: 'RS',
    party: { acronym: 'FCS', name: 'Frente Cívica Sulista (fictícia)' },
    bio: 'Perfil fictício de demonstração com propostas sobre desenvolvimento sustentável e serviços sociais.',
    performance: 87,
    transparencyBadges: ['Dados Abertos', 'Relatórios em Dia'],
    alignmentProfile: 'environmental',
    featuredArea: 'Desenvolvimento sustentável',
  },
  {
    id: 'caetano-farias',
    name: 'Caetano Souza Farias',
    initials: 'CF',
    role: 'Deputado Estadual',
    office: 'deputado-estadual',
    state: 'RO',
    party: { acronym: 'PRA', name: 'Partido Renovação Amazônica (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre infraestrutura e acesso a serviços.',
    performance: 79,
    transparencyBadges: ['Presença em Dia', 'Votações Registradas'],
    alignmentProfile: 'balanced',
    featuredArea: 'Infraestrutura',
  },
  {
    id: 'juliana-torres',
    name: 'Juliana Braga Torres',
    initials: 'JT',
    role: 'Senadora',
    office: 'senador',
    state: 'RR',
    party: { acronym: 'PFR', name: 'Partido Fronteira Responsável (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre proteção ambiental e serviços regionais.',
    performance: 84,
    transparencyBadges: ['Agenda Pública', 'Dados Abertos'],
    alignmentProfile: 'environmental',
    featuredArea: 'Serviços regionais',
  },
  {
    id: 'felipe-neves',
    name: 'Felipe Andrade Neves',
    initials: 'FN',
    role: 'Deputado Federal',
    office: 'deputado-federal',
    state: 'SC',
    party: { acronym: 'MOV', name: 'Movimento Ordem e Vida (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre educação profissional e responsabilidade fiscal.',
    performance: 78,
    transparencyBadges: ['Relatórios em Dia', 'Votações Registradas'],
    alignmentProfile: 'market',
    featuredArea: 'Educação profissional',
  },
  {
    id: 'luiz-pires',
    name: 'Luiz Fernando Pires',
    initials: 'LP',
    role: 'Deputado Estadual',
    office: 'deputado-estadual',
    state: 'SE',
    party: { acronym: 'PPA', name: 'Partido Participação Aberta (fictício)' },
    bio: 'Perfil fictício de demonstração com propostas sobre participação cidadã e transparência.',
    performance: 86,
    transparencyBadges: ['Ouvidoria Ativa', 'Contas em Dia'],
    alignmentProfile: 'participatory',
    featuredArea: 'Participação cidadã',
  },
  {
    id: 'helena-queiroz',
    name: 'Helena Castro Queiroz',
    initials: 'HQ',
    role: 'Governadora',
    office: 'governador',
    state: 'TO',
    party: { acronym: 'FDS', name: 'Frente Desenvolvimento Sustentável (fictícia)' },
    bio: 'Perfil fictício de demonstração com propostas sobre proteção ambiental e infraestrutura regional.',
    performance: 89,
    transparencyBadges: ['Compras Abertas', 'Agenda Pública', 'Dados Abertos'],
    alignmentProfile: 'environmental',
    featuredArea: 'Infraestrutura sustentável',
  },
]

const quizPositionProfiles = {
  publicServices: {
    state_market: 2, fiscal_investment: 1, progressive_taxation: 1, public_education: 2,
    local_autonomy: 0, security_guarantees: 1, universal_services: 2, environmental_protection: 0,
    administrative_capacity: 1, open_transparency: 1, participatory_decision: 0, labor_protection: 1,
  },
  balanced: {
    state_market: 0, fiscal_investment: 0, progressive_taxation: 0, public_education: 0,
    local_autonomy: 0, security_guarantees: 0, universal_services: 0, environmental_protection: 0,
    administrative_capacity: 0, open_transparency: 0, participatory_decision: 0, labor_protection: 0,
  },
  marketLiberal: {
    state_market: -2, fiscal_investment: -2, progressive_taxation: -1, public_education: -1,
    local_autonomy: 1, security_guarantees: -1, universal_services: -1, environmental_protection: 0,
    administrative_capacity: -1, open_transparency: 1, participatory_decision: -1, labor_protection: -2,
  },
  developmentalist: {
    state_market: 2, fiscal_investment: 2, progressive_taxation: 1, public_education: 2,
    local_autonomy: -1, security_guarantees: 1, universal_services: 1, environmental_protection: 0,
    administrative_capacity: 2, open_transparency: 1, participatory_decision: 0, labor_protection: 1,
  },
  progressive: {
    state_market: 2, fiscal_investment: 1, progressive_taxation: 2, public_education: 2,
    local_autonomy: 1, security_guarantees: 2, universal_services: 2, environmental_protection: 2,
    administrative_capacity: 1, open_transparency: 2, participatory_decision: 2, labor_protection: 2,
  },
  conservative: {
    state_market: -1, fiscal_investment: 0, progressive_taxation: -1, public_education: 0,
    local_autonomy: -1, security_guarantees: -2, universal_services: 0, environmental_protection: -1,
    administrative_capacity: 0, open_transparency: 1, participatory_decision: -1, labor_protection: -2,
  },
  municipalist: {
    state_market: 1, fiscal_investment: 0, progressive_taxation: 0, public_education: 1,
    local_autonomy: 2, security_guarantees: 1, universal_services: 1, environmental_protection: 0,
    administrative_capacity: 1, open_transparency: 2, participatory_decision: 2, labor_protection: 1,
  },
  environmentalist: {
    state_market: 1, fiscal_investment: 1, progressive_taxation: 1, public_education: 2,
    local_autonomy: 1, security_guarantees: 1, universal_services: 1, environmental_protection: 2,
    administrative_capacity: 1, open_transparency: 2, participatory_decision: 1, labor_protection: 1,
  },
}

export const POLITICAL_QUIZ_QUESTIONS = [
  {
    id: 'state_market', category: 'Economia e serviços', axisLabel: 'Mercado ↔ Estado',
    leftLabel: 'Mais mercado', rightLabel: 'Mais Estado',
    prompt: 'O Estado deve liderar diretamente a prestação de serviços essenciais, mesmo quando existam alternativas privadas.',
  },
  {
    id: 'fiscal_investment', category: 'Orçamento', axisLabel: 'Austeridade ↔ Investimento',
    leftLabel: 'Mais austeridade', rightLabel: 'Mais investimento',
    prompt: 'Regras fiscais devem permitir investimento público adicional em serviços essenciais, mesmo quando isso exigir maior flexibilidade de curto prazo.',
  },
  {
    id: 'progressive_taxation', category: 'Tributação', axisLabel: 'Impostos ↔ Progressividade',
    leftLabel: 'Menos progressividade', rightLabel: 'Mais progressividade',
    prompt: 'O sistema tributário deve cobrar proporcionalmente mais de rendas e patrimônios elevados para financiar serviços e reduzir desigualdades.',
  },
  {
    id: 'public_education', category: 'Educação', axisLabel: 'Pluralidade ↔ Rede pública',
    leftLabel: 'Mais pluralidade', rightLabel: 'Mais rede pública',
    prompt: 'A expansão do acesso à educação deve priorizar o fortalecimento da rede pública e a valorização de seus profissionais.',
  },
  {
    id: 'local_autonomy', category: 'Federalismo', axisLabel: 'Centralização ↔ Autonomia local',
    leftLabel: 'Mais centralização', rightLabel: 'Mais autonomia',
    prompt: 'Estados e municípios devem ter maior autonomia para adaptar políticas nacionais às realidades locais.',
  },
  {
    id: 'security_guarantees', category: 'Segurança pública', axisLabel: 'Punição ↔ Garantias e prevenção',
    leftLabel: 'Mais ênfase punitiva', rightLabel: 'Mais garantias e prevenção',
    prompt: 'Políticas de segurança devem priorizar prevenção, investigação e garantias de direitos, junto à responsabilização.',
  },
  {
    id: 'universal_services', category: 'Proteção social', axisLabel: 'Focalização ↔ Universalidade',
    leftLabel: 'Mais focalização', rightLabel: 'Mais universalidade',
    prompt: 'Serviços sociais universais devem ser o eixo principal da proteção social, com apoio adicional a grupos vulneráveis.',
  },
  {
    id: 'environmental_protection', category: 'Meio ambiente', axisLabel: 'Exploração ↔ Sustentabilidade',
    leftLabel: 'Mais exploração', rightLabel: 'Mais sustentabilidade',
    prompt: 'Metas de proteção ambiental devem prevalecer sobre ganhos econômicos de curto prazo quando houver conflito entre eles.',
  },
  {
    id: 'administrative_capacity', category: 'Reforma administrativa', axisLabel: 'Flexibilidade ↔ Capacidade pública',
    leftLabel: 'Mais flexibilidade', rightLabel: 'Mais capacidade',
    prompt: 'A reforma administrativa deve priorizar capacidade técnica, estabilidade institucional e valorização dos servidores públicos.',
  },
  {
    id: 'open_transparency', category: 'Transparência', axisLabel: 'Divulgação mínima ↔ Transparência',
    leftLabel: 'Divulgação mínima', rightLabel: 'Transparência proativa',
    prompt: 'Dados sobre despesas, agendas e contratos públicos devem ser publicados proativamente em formatos abertos e acessíveis.',
  },
  {
    id: 'participatory_decision', category: 'Participação cidadã', axisLabel: 'Representação ↔ Participação direta',
    leftLabel: 'Mais representação', rightLabel: 'Mais participação',
    prompt: 'Consultas públicas e conselhos cidadãos devem influenciar decisões e prioridades orçamentárias.',
  },
  {
    id: 'labor_protection', category: 'Trabalho', axisLabel: 'Flexibilização ↔ Proteção trabalhista',
    leftLabel: 'Mais flexibilização', rightLabel: 'Mais proteção',
    prompt: 'A legislação deve priorizar proteção trabalhista e negociação coletiva diante de propostas de flexibilização.',
  },
].map((question) => ({
  ...question,
  options: [
    { value: -2, label: 'Discordo totalmente' },
    { value: -1, label: 'Discordo parcialmente' },
    { value: 0, label: 'Neutro / depende do caso' },
    { value: 1, label: 'Concordo com ressalvas técnicas' },
    { value: 2, label: 'Concordo plenamente' },
  ],
}))

// =============================================================================
// PROJETOS DE LEI ("repositórios")
// forks = amendments.length  |  stars = apoios  |  commits = histórico de andamento
// readme: markdown simples (## títulos, - listas, parágrafos)
// =============================================================================

export const projects = [
  {
    id: 'pl-231-2026',
    number: 'PL 231/2026',
    title: 'Prontuário Digital Unificado',
    summary: 'Um único prontuário eletrônico acessível em toda a rede pública estadual de saúde.',
    tags: ['Saúde', 'Tecnologia'],
    status: 'em_tramitacao',
    stars: 1842,
    createdAt: daysAgo(96),
    updatedAt: daysAgo(2),
    readme: `## Em linguagem simples
Hoje cada posto de saúde guarda o histórico do paciente em um sistema diferente. Este projeto cria um prontuário digital único: onde quer que você seja atendido, o profissional vê seus exames, alergias e medicamentos.

## Quem ganha com isso
- Pacientes: menos exames repetidos e menos filas de reconsulta.
- Profissionais de saúde: histórico completo em segundos.
- Gestão pública: menos desperdício com exames duplicados.

## Garantias de privacidade
- Todo acesso fica registrado e pode ser auditado.
- O paciente pode consultar quem acessou os seus dados.

## Em que pé está
Aguardando parecer da Comissão de Saúde.`,
    amendments: [
      amendment('em-231-1', 'Dep. Rui Camargo', 'Auditoria de acessos visível ao paciente', 'aceita'),
      amendment('em-231-2', 'Dep. Ana Beltrão', 'Prazo de 24 meses para implantação', 'em análise'),
      amendment('em-231-3', 'Cidadão (consulta pública)', 'Versão simplificada para postos rurais sem internet', 'aceita'),
    ],
    commits: [
      commit('cm-231-1', 96, 'protocolo', 'Projeto protocolado na Assembleia'),
      commit('cm-231-2', 40, 'emenda', 'Emenda de privacidade incorporada ao texto'),
      commit('cm-231-3', 2, 'status', 'Parecer favorável na Comissão de Constituição e Justiça'),
    ],
  },
  {
    id: 'pl-087-2025',
    number: 'PL 087/2025',
    title: 'Merenda Escolar com Produtor Local',
    summary: 'Parte da merenda das escolas estaduais passa a ser comprada de agricultores familiares da região.',
    tags: ['Educação', 'Economia'],
    status: 'aprovado',
    stars: 3210,
    createdAt: daysAgo(410),
    updatedAt: daysAgo(120),
    readme: `## Em linguagem simples
Pelo menos 40% dos alimentos da merenda das escolas estaduais passam a ser comprados de agricultores familiares da própria região.

## Quem ganha com isso
- Alunos: comida mais fresca e variada.
- Agricultores familiares: venda garantida durante todo o ano letivo.
- Economia local: o dinheiro público circula perto de casa.

## Em que pé está
Sancionada e em vigor. O acompanhamento das compras é publicado todo trimestre.`,
    amendments: [
      amendment('em-087-1', 'Dep. Rui Camargo', 'Prioridade para comunidades quilombolas e indígenas', 'aceita'),
      amendment('em-087-2', 'Dep. Júlio Prado', 'Teto de preço por quilo', 'rejeitada'),
      amendment('em-087-3', 'Nutricionistas da rede', 'Cardápio validado por nutricionista regional', 'aceita'),
    ],
    commits: [
      commit('cm-087-1', 410, 'protocolo', 'Projeto protocolado na Assembleia'),
      commit('cm-087-2', 300, 'emenda', 'Emenda de prioridade para comunidades tradicionais incorporada'),
      commit('cm-087-3', 120, 'status', 'Sancionado pelo Executivo: lei em vigor'),
    ],
  },
  {
    id: 'pl-154-2025',
    number: 'PL 154/2025',
    title: 'Painel Público de Gastos do Gabinete',
    summary: 'Todos os gastos de gabinete publicados em formato aberto, com comprovante, até o dia 5 de cada mês.',
    tags: ['Transparência', 'Tecnologia'],
    status: 'aprovado',
    stars: 2765,
    createdAt: daysAgo(300),
    updatedAt: daysAgo(180),
    readme: `## Em linguagem simples
Cada deputado passa a publicar, em um painel aberto, quanto gastou da verba de gabinete e com quê, anexando o comprovante.

## Como funciona
- Atualização mensal, até o dia 5.
- Dados em formato aberto (CSV e API), para jornalistas e pesquisadores.
- Qualquer cidadão pode questionar um gasto direto no painel.

## Em que pé está
Aprovado. O gabinete da autora já publica no padrão desde o primeiro mês.`,
    amendments: [
      amendment('em-154-1', 'Dep. Ana Beltrão', 'Incluir diárias e passagens no painel', 'aceita'),
      amendment('em-154-2', 'Instituto de Dados Abertos (fictício)', 'Padronizar categorias de despesa', 'aceita'),
    ],
    commits: [
      commit('cm-154-1', 300, 'protocolo', 'Projeto protocolado na Assembleia'),
      commit('cm-154-2', 180, 'status', 'Aprovado em plenário por ampla maioria'),
    ],
  },
  {
    id: 'pl-302-2026',
    number: 'PL 302/2026',
    title: 'Ciclovias Conectadas ao Transporte Público',
    summary: 'Ciclovias que levam a terminais e estações, com bicicletários seguros e cobertos.',
    tags: ['Mobilidade', 'Meio Ambiente'],
    status: 'em_tramitacao',
    stars: 954,
    createdAt: daysAgo(58),
    updatedAt: daysAgo(6),
    readme: `## Em linguagem simples
Hoje muitas ciclovias terminam no meio do nada. O projeto obriga que as novas ciclovias estaduais liguem bairros a terminais de ônibus e estações, com bicicletário seguro.

## Quem ganha com isso
- Quem pedala: trajeto completo e seguro até o trabalho.
- Quem usa transporte público: mais uma forma de chegar ao ponto.
- Cidade: menos carros nas ruas e menos poluição.

## Em que pé está
Em análise na Comissão de Meio Ambiente.`,
    amendments: [
      amendment('em-302-1', 'Associação de Ciclistas (fictícia)', 'Iluminação obrigatória em trechos noturnos', 'em análise'),
    ],
    commits: [
      commit('cm-302-1', 58, 'protocolo', 'Projeto protocolado na Assembleia'),
      commit('cm-302-2', 6, 'status', 'Audiência pública realizada com moradores e ciclistas'),
    ],
  },
  {
    id: 'pl-019-2024',
    number: 'PL 019/2024',
    title: 'Telemedicina em Comunidades Isoladas',
    summary: 'Consultas por vídeo com especialistas para comunidades de difícil acesso.',
    tags: ['Saúde'],
    status: 'arquivado',
    stars: 612,
    createdAt: daysAgo(700),
    updatedAt: daysAgo(420),
    readme: `## Em linguagem simples
Levar consulta com especialista a comunidades onde o médico mais próximo fica a horas de distância, usando internet e um posto de apoio.

## O que aconteceu
O projeto foi arquivado por decurso de prazo. A autora estuda reapresentar a proposta incorporando o Prontuário Digital Unificado (PL 231/2026).`,
    amendments: [],
    commits: [
      commit('cm-019-1', 700, 'protocolo', 'Projeto protocolado na Assembleia'),
      commit('cm-019-2', 420, 'status', 'Arquivado por decurso de prazo; reapresentação em estudo'),
    ],
  },
  {
    id: 'pl-340-2026',
    number: 'PL 340/2026',
    title: 'Wi-Fi Livre em Escolas Públicas',
    summary: 'Internet de qualidade e segura em todas as escolas estaduais, para alunos e professores.',
    tags: ['Educação', 'Tecnologia'],
    status: 'em_tramitacao',
    stars: 428,
    createdAt: daysAgo(9),
    updatedAt: daysAgo(3),
    readme: `## Em linguagem simples
Toda escola estadual passa a ter internet de qualidade, com filtros de segurança para os alunos e uso pedagógico garantido.

## Quem ganha com isso
- Alunos: acesso a pesquisa e conteúdo digital dentro da escola.
- Professores: aulas com recursos que hoje dependem de internet própria.

## Em que pé está
Recém-protocolado. Aberto para sugestões de emendas.`,
    amendments: [],
    commits: [
      commit('cm-340-1', 9, 'protocolo', 'Projeto protocolado na Assembleia'),
      commit('cm-340-2', 3, 'status', 'Aberto o período de sugestões da sociedade'),
    ],
  },
]

// =============================================================================
// TRAJETÓRIA (end: null = em andamento)
// =============================================================================

export const timeline = {
  mandates: [
    { id: 'm-1', title: 'Deputada Estadual', organization: 'Assembleia Legislativa (fictícia)', start: 2023, end: null, description: 'Presidente da Comissão de Saúde e relatora de pautas de transparência.' },
    { id: 'm-2', title: 'Vereadora', organization: 'Câmara Municipal de Vila Nova (fictícia)', start: 2019, end: 2022, description: 'Relatora da política municipal de saúde mental.' },
    { id: 'm-3', title: 'Secretária Adjunta de Saúde', organization: 'Prefeitura de Vila Nova (fictícia)', start: 2017, end: 2018, description: 'Coordenou a informatização de 32 unidades básicas de saúde.' },
  ],
  experience: [
    { id: 'e-1', title: 'Professora convidada', organization: 'Universidade Federal do Planalto (fictícia)', start: 2014, end: 2019, description: 'Disciplina de Gestão em Saúde Pública.' },
    { id: 'e-2', title: 'Coordenadora de Projetos', organization: 'ONG Saúde em Rede (fictícia)', start: 2016, end: 2017, description: 'Projetos de atenção básica em comunidades rurais.' },
    { id: 'e-3', title: 'Médica sanitarista', organization: 'Hospital Regional do Vale (fictício)', start: 2009, end: 2016, description: 'Atuação em vigilância epidemiológica e urgência.' },
  ],
  education: [
    { id: 'ed-1', title: 'Especialização em Políticas Públicas', organization: 'Instituto Horizonte de Governo (fictício)', start: 2015, end: 2016, description: null },
    { id: 'ed-2', title: 'Mestrado em Saúde Coletiva', organization: 'Universidade Federal do Planalto (fictícia)', start: 2012, end: 2014, description: null },
    { id: 'ed-3', title: 'Graduação em Medicina', organization: 'Universidade Estadual do Vale (fictícia)', start: 2003, end: 2008, description: null },
  ],
}

// =============================================================================
// FEED (mais recentes primeiro)
// =============================================================================

export const posts = [
  {
    id: 'post-001',
    type: 'atualizacao',
    projectId: 'pl-231-2026',
    content: 'O PL 231/2026 recebeu parecer favorável na CCJ. Próxima parada: Comissão de Saúde. Obrigada a todos que enviaram sugestões sobre privacidade: duas delas viraram emendas.',
    createdAt: daysAgo(2, 9),
    reactions: { apoio: 214, aplauso: 98, ideia: 41, duvida: 6 },
    comments: [
      { id: 'c-001', author: 'Marcos Teixeira', initials: 'MT', isAuthor: false, content: 'Ótima notícia! Como o paciente vai conseguir ver quem acessou o prontuário?', createdAt: daysAgo(2, 15) },
      { id: 'c-002', author: 'Helena Marques Duarte', initials: 'HM', isAuthor: true, content: 'Boa pergunta, Marcos! Cada acesso fica em um histórico que o próprio paciente consulta pelo aplicativo do prontuário. Está na emenda 1.', createdAt: daysAgo(2, 18) },
    ],
  },
  {
    id: 'post-002',
    type: 'prestacao',
    projectId: 'pl-154-2025',
    content: 'Prestação de contas de outubro publicada. Todos os gastos do gabinete e os comprovantes estão no painel público. É o PL 154/2025 em ação.',
    createdAt: daysAgo(11, 10),
    reactions: { apoio: 156, aplauso: 120, ideia: 12, duvida: 3 },
    comments: [
      { id: 'c-003', author: 'Larissa Moura', initials: 'LM', isAuthor: false, content: 'Conferi o painel e está bem organizado. Seria bom ter um filtro por fornecedor.', createdAt: daysAgo(10, 9) },
    ],
  },
  {
    id: 'post-003',
    type: 'atualizacao',
    projectId: 'pl-340-2026',
    content: 'Protocolei o PL 340/2026: Wi-Fi livre nas escolas públicas. O texto está aberto para sugestões. Se você é professor ou aluno, me diga o que faltaria na sua escola.',
    createdAt: daysAgo(9, 14),
    reactions: { apoio: 87, aplauso: 40, ideia: 55, duvida: 9 },
    comments: [],
  },
  {
    id: 'post-004',
    type: 'votacao',
    projectId: null,
    content: 'Votei a favor do Orçamento 2027 com a emenda que reserva recursos para a atenção básica. A votação e o texto completo da emenda estão no portal da Assembleia.',
    createdAt: daysAgo(14, 17),
    reactions: { apoio: 73, aplauso: 21, ideia: 4, duvida: 18 },
    comments: [
      { id: 'c-004', author: 'Paulo Henrique', initials: 'PH', isAuthor: false, content: 'Quanto da emenda vai para a atenção básica no total?', createdAt: daysAgo(13, 10) },
    ],
  },
]

// =============================================================================
// HEATMAP (gerado de forma determinística, relativo à data de hoje)
// Formato: { 'YYYY-MM-DD': { total, protocolo, voto, atualizacao, prestacao } }
// =============================================================================

function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildActivityLog(days = 371, seed = 20260101) {
  const rand = mulberry32(seed)
  const pick = (max) => 1 + Math.floor(rand() * max)
  const log = {}
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today)
    day.setDate(today.getDate() - i)
    const weekday = day.getDay() // 0 = domingo
    const isPlenaryDay = weekday >= 2 && weekday <= 4 // ter a qui
    const isWeekend = weekday === 0 || weekday === 6
    const roll = rand()
    const entry = { total: 0, protocolo: 0, voto: 0, atualizacao: 0, prestacao: 0 }

    if (isPlenaryDay && roll > 0.1) {
      entry.voto = pick(5)
      if (rand() > 0.85) entry.protocolo = 1
      if (rand() > 0.5) entry.atualizacao = pick(2)
    } else if (!isWeekend && roll > 0.6) {
      entry.atualizacao = 1
    } else if (isWeekend && roll > 0.92) {
      entry.prestacao = 1
    }
    if (day.getDate() === 5) entry.prestacao += 1 // prestação de contas mensal

    entry.total = entry.protocolo + entry.voto + entry.atualizacao + entry.prestacao
    if (entry.total > 0) log[toISODate(day)] = entry
  }
  return log
}

const profileAliases = {
  market: 'marketLiberal',
  participatory: 'municipalist',
  environmental: 'environmentalist',
}
const projectAreas = ['Saúde', 'Educação', 'Transparência', 'Mobilidade', 'Meio Ambiente', 'Segurança', 'Economia']
const projectStatuses = ['em_tramitacao', 'aprovado', 'em_tramitacao']

function createPositionVector(profileName, variant) {
  const profileKey = profileAliases[profileName] || profileName
  const vector = { ...(quizPositionProfiles[profileKey] || quizPositionProfiles.balanced) }
  const variantAxes = ['local_autonomy', 'administrative_capacity', 'open_transparency', 'participatory_decision']
  let code = variant

  for (const axis of variantAxes) {
    const base = vector[axis]
    const alternatives = [-2, -1, 0, 1, 2].sort(
      (a, b) => Math.abs(a - base) - Math.abs(b - base) || a - b,
    )
    vector[axis] = alternatives[code % alternatives.length]
    code = Math.floor(code / alternatives.length)
  }
  return vector
}

function createDemonstrationProjects(candidate, index, stateName, area) {
  return [0, 1].map((projectIndex) => {
    const projectArea = projectIndex === 0 ? area : projectAreas[(index + projectIndex + 2) % projectAreas.length]
    const projectNumber = `PL ${String(index * 2 + projectIndex + 401).padStart(3, '0')}/2026`
    const title = projectIndex === 0
      ? `Programa demonstrativo de ${projectArea.toLocaleLowerCase('pt-BR')} em ${stateName}`
      : `Plano de transparência e resultados para ${stateName}`
    const status = projectStatuses[(index + projectIndex) % projectStatuses.length]
    return {
      id: `${candidate.id}-pl-${projectIndex + 1}`,
      number: projectNumber,
      title,
      summary: `Proposta fictícia para demonstrar como o perfil de ${candidate.name} apresenta iniciativas públicas, etapas e participação cidadã.`,
      tags: [projectArea, projectIndex ? 'Transparência' : 'Tecnologia'],
      status,
      stars: 28 + ((index * 97 + projectIndex * 131) % 1400),
      createdAt: daysAgo(24 + index * 7 + projectIndex * 61),
      updatedAt: daysAgo(2 + (index * 3 + projectIndex * 5) % 80),
      readme: `## Em linguagem simples\nEsta proposta demonstrativa reúne medidas de ${projectArea.toLocaleLowerCase('pt-BR')} para ${stateName}. O conteúdo é fictício e serve apenas para ilustrar o acompanhamento de um projeto.\n\n## Objetivos\n- Descrever o problema público e o público beneficiado.\n- Publicar metas e etapas de execução em linguagem acessível.\n- Permitir acompanhamento e sugestões da população.\n\n## Situação demonstrativa\n${status === 'aprovado' ? 'Aprovado em caráter ilustrativo.' : 'Em tramitação demonstrativa, sujeito a debate e alterações.'}`,
      amendments: [
        { id: `${candidate.id}-em-${projectIndex}-1`, author: 'Participação pública demonstrativa', title: 'Publicação de metas e indicadores', status: 'aceita' },
      ],
      commits: [
        commit(`${candidate.id}-cm-${projectIndex}-1`, 24 + index * 7, 'protocolo', 'Projeto demonstrativo protocolado'),
        commit(`${candidate.id}-cm-${projectIndex}-2`, 2 + (index * 3 + projectIndex * 5) % 80, 'status', status === 'aprovado' ? 'Aprovado em caráter demonstrativo' : 'Texto encaminhado para análise'),
      ],
    }
  })
}

function createDemonstrationVotes(candidate, positions, index) {
  const voteTopics = [
    { axis: 'universal_services', title: 'Ampliação demonstrativa da atenção básica', direction: 'fortalecimento dos serviços públicos universais' },
    { axis: 'environmental_protection', title: 'Metas demonstrativas de proteção ambiental', direction: 'critérios de sustentabilidade e fiscalização' },
    { axis: 'open_transparency', title: 'Publicação de contratos e despesas em formato aberto', direction: 'divulgação proativa de informações públicas' },
  ]
  return voteTopics.map((topic, voteIndex) => {
    const position = positions[topic.axis]
    const vote = position > 0 ? 'A favor' : position < 0 ? 'Contra' : index % 2 ? 'Abstenção' : 'A favor'
    return {
      id: `${candidate.id}-vote-${voteIndex + 1}`,
      title: topic.title,
      date: daysAgo(12 + index * 3 + voteIndex * 11),
      vote,
      summary: `${vote} da proposta demonstrativa relacionada a ${topic.direction}.`,
    }
  })
}

function createDemonstrationBadges(candidate, index) {
  const icons = ['ShieldCheck', 'CalendarCheck', 'ScrollText', 'Eye', 'MessagesSquare', 'Cpu']
  const tiers = ['ouro', 'prata', 'bronze']
  return candidate.transparencyBadges.map((label, badgeIndex) => ({
    id: `${candidate.id}-badge-${badgeIndex + 1}`,
    label,
    description: 'Selo fictício de demonstração; não representa verificação ou certificação real.',
    icon: icons[(index + badgeIndex) % icons.length],
    tier: tiers[(index + badgeIndex) % tiers.length],
    earnedAt: `${2023 + ((index + badgeIndex) % 4)}-01-15`,
  }))
}

function createDemonstrationTimeline(candidate, stateName, index) {
  return {
    mandates: [{
      id: `${candidate.id}-mandate-current`,
      title: candidate.role,
      organization: `${candidate.office === 'governador' ? 'Governo' : 'Representação legislativa'} de ${stateName} (fictício)`,
      start: 2023,
      end: null,
      description: `Mandato e atividades apresentados como dados fictícios de demonstração para ${candidate.name}.`,
    }, {
      id: `${candidate.id}-mandate-previous`,
      title: 'Mandato municipal anterior',
      organization: `Câmara Municipal de ${stateName} (fictícia)`,
      start: 2019,
      end: 2022,
      description: 'Experiência pública anterior incluída como dado fictício para demonstrar a linha do tempo.',
    }],
    experience: [{
      id: `${candidate.id}-experience`,
      title: `Atuação em ${candidate.featuredArea || projectAreas[index % projectAreas.length]}`,
      organization: 'Experiência profissional demonstrativa',
      start: 2017,
      end: 2022,
      description: 'Registro ilustrativo de experiência anterior, sem correspondência com uma pessoa real.',
    }],
    education: [{
      id: `${candidate.id}-education`,
      title: 'Formação em políticas públicas (demonstrativa)',
      organization: 'Instituição fictícia',
      start: 2010,
      end: 2014,
      description: 'Formação incluída apenas para demonstrar a estrutura de trajetória.',
    }],
  }
}

function createDemonstrationPosts(candidate, projects, index) {
  const project = projects[0]
  return [{
    id: `${candidate.id}-post-1`,
    type: 'atualizacao',
    projectId: project.id,
    content: `Atualização demonstrativa: ${project.title}. Acompanhe as etapas e envie sugestões sobre a proposta.`,
    createdAt: daysAgo(3 + index * 2),
    reactions: { apoio: 12 + index * 3, aplauso: 5 + index, ideia: 2 + index % 4, duvida: index % 3 },
    comments: [],
  }, {
    id: `${candidate.id}-post-2`,
    type: 'votacao',
    projectId: null,
    content: 'Registro de votação demonstrativo, incluído para exemplificar a prestação de contas do perfil.',
    createdAt: daysAgo(15 + index * 2),
    reactions: { apoio: 7 + index, aplauso: 3 + index % 5, ideia: 1, duvida: 2 },
    comments: [],
  }]
}

const politicianSeeds = [...politicianProfiles, ...additionalPoliticians]
const profileVariants = new Map()

export const politicians = politicianSeeds.map((candidate, index) => {
  const profileName = profileAliases[candidate.alignmentProfile] || candidate.alignmentProfile || 'balanced'
  const variant = profileVariants.get(profileName) || 0
  profileVariants.set(profileName, variant + 1)
  const positions = createPositionVector(profileName, variant)
  const stateName = BRAZIL_UFS.find(({ uf }) => uf === candidate.state)?.name || candidate.state
  const performance = candidate.performance
  const isDefaultProfile = candidate.id === profile.id
  const sessionsAttended = isDefaultProfile ? profile.stats.sessionsAttended : 92 + ((index * 17) % 83)
  const plenaryVotes = isDefaultProfile ? profile.stats.plenaryVotes : 180 + ((index * 53) % 420)
  const projectsPresented = isDefaultProfile ? projects.length : 8 + ((index * 7) % 38)
  const projectsApproved = isDefaultProfile
    ? projects.filter(({ status }) => status === 'aprovado').length
    : Math.min(projectsPresented, 2 + ((index * 3) % 16))
  const quotaUsePct = 48 + ((index * 13) % 48)
  const metrics = {
    transparency: performance,
    presence: isDefaultProfile ? profile.stats.presencePct : Math.min(100, 72 + ((index * 11) % 29)),
    sessionsAttended,
    plenaryVotes,
    publishedReports: Math.max(1, Math.round(performance / 15)),
    projectsPresented,
    projectsApproved,
    quotaUsePct,
    costBenefit: Math.min(98, 54 + ((index * 19) % 45)),
  }
  const demonstrationProjects = candidate.id === profile.id
    ? projects
    : createDemonstrationProjects(candidate, index, stateName, candidate.featuredArea || projectAreas[index % projectAreas.length])
  const politicianProfile = candidate.id === profile.id
    ? { ...profile }
    : {
      id: candidate.id,
      name: candidate.name,
      handle: `@${candidate.id}`,
      role: candidate.role,
      state: candidate.state,
      house: `${candidate.office === 'governador' ? 'Executivo estadual' : 'Casa legislativa'} de ${stateName} (fictícia)`,
      party: candidate.party,
      avatarUrl: null,
      initials: candidate.initials,
      mandate: '2023 — presente (demonstrativo)',
      bio: candidate.bio,
      xp: 2400 + index * 175,
      stats: { presencePct: metrics.presence, plenaryVotes, sessionsAttended },
    }
  const politicianBadges = candidate.id === profile.id ? badges : createDemonstrationBadges(candidate, index)
  const politicianTimeline = candidate.id === profile.id
    ? timeline
    : createDemonstrationTimeline(candidate, stateName, index)
  const politicianPosts = candidate.id === profile.id
    ? posts
    : createDemonstrationPosts(candidate, demonstrationProjects, index)

  return {
    ...candidate,
    profile: politicianProfile,
    stateName,
    positions,
    metrics,
    badges: politicianBadges,
    projects: demonstrationProjects,
    timeline: politicianTimeline,
    history: politicianTimeline.mandates.map(({ id, start, title }) => ({ id, year: start, title })),
    posts: politicianPosts,
    activity: buildActivityLog(371, 20260101 + index * 997),
    votes: createDemonstrationVotes(candidate, positions, index),
  }
})

// =============================================================================
// "BANCO" INICIAL (é isto que vai para o localStorage)
// =============================================================================

export const createInitialData = () => ({
  version: SCHEMA_VERSION,
  profile,
  badges,
  projects,
  timeline,
  posts,
  activity: buildActivityLog(),
  activePoliticianId: profile.id,
  politicianSnapshots: {},
  // o que o cidadão (visitante) fez neste navegador
  viewer: { starred: [], reactions: {}, quizResult: null },
})
