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
  // o que o cidadão (visitante) fez neste navegador
  viewer: { starred: [], reactions: {} },
})
