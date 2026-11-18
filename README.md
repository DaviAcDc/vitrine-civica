# Vitrine Cívica

> **Protótipo em desenvolvimento.** A Vitrine Cívica é uma proposta de Hub
> Nacional de Fiscalização Política e Alinhamento Cidadão. Os dados e perfis
> atualmente exibidos são fictícios e não representam pessoas, partidos ou
> mandatos reais.

## Visão geral

A Vitrine Cívica explora uma interface pública para acompanhar a atividade de
representantes e compreender propostas legislativas. A experiência combina
rastreabilidade inspirada em repositórios do GitHub, elementos de perfil e
gamificação associados à Steam e um questionário de alinhamento político
multieixos inspirado em modelos como o 12axes.

O objetivo do protótipo é organizar informações cívicas em perfis acessíveis:
projetos são apresentados com histórico e explicações em linguagem simples,
enquanto cidadãos podem acompanhar atualizações, apoiar propostas, comentar e
comparar suas respostas a posicionamentos demonstrativos. XP, selos e métricas
são recursos de interface, não avaliações oficiais de desempenho.

## Funcionalidades implementadas

### Hub Nacional por estado

- Filtro para as 27 Unidades Federativas — 26 estados e o Distrito Federal —,
  por cargo e por texto.
- Catálogo de 29 perfis fictícios, com representantes distribuídos por todas as
  UFs e cargos de governador, senador, deputado federal e deputado estadual.
- Cartões com partido, estado, indicador demonstrativo e selos visuais de
  transparência e prestação de contas.

### Quiz de alinhamento político

- Questionário com 12 pautas e cinco níveis de resposta, da discordância total
  à concordância plena.
- Vetores demonstrativos próprios para cada perfil, em escala de −2 a +2, que
  cobrem economia, serviços públicos, federalismo, segurança, meio ambiente,
  administração pública, transparência, participação e trabalho.
- Ranking calculado por distância euclidiana normalizada. Para `n` eixos
  comparáveis, `d = √Σ(respostaᵢ − posiçãoᵢ)²` e a afinidade é
  `arredondar(100 × (1 − d / (4√n)))`, limitada ao intervalo de 0% a 100%.
- Comparativo visual por eixo, que evidencia aproximações e diferenças sem
  recomendar voto.

### Perfil cívico e projetos

- Cabeçalho centralizado com avatar ou iniciais, cargo, partido, estado, XP,
  nível e conquistas.
- Heatmap anual de atividade cívica no perfil principal e resumo de atividade
  no modal responsivo de perfil.
- Modal centralizado e rolável, com indicadores demonstrativos de assiduidade,
  transparência, uso de cota, custo-benefício e projetos apresentados/aprovados.
- Abas de projetos de lei, votações recentes, trajetória e alinhamento com o
  cidadão, quando há um resultado válido do quiz.
- Projetos apresentados como repositórios: status, temas, apoios (“stars”),
  emendas (“forks”), README e histórico de tramitação.
- Trajetória organizada em mandatos, experiência profissional e formação.

### Interação e persistência

- Feed de atualizações com reações e comentários.
- Modo de edição simulado para criar projetos, atualizar tramitações e publicar
  atualizações.
- Persistência local de interações, resultados do quiz e snapshots dos perfis
  no `localStorage`; o controle **Resetar demo** restaura os dados iniciais.
- A ação **Abrir perfil completo na página principal** carrega o perfil
  selecionado para interação e simulação de edição.

## Tecnologias

- React 18
- Vite 5
- Tailwind CSS 3
- Lucide React (ícones)
- Node.js e npm para desenvolvimento e execução dos testes

## Como executar

Requisitos: Node.js e npm instalados.

```bash
npm install
npm run dev
```

O Vite informa no terminal o endereço local — normalmente
`http://localhost:5173`.

Para validar o build de produção e executar os testes:

```bash
npm run build
npm test
```

## Estado do projeto e limitações

Esta versão é um protótipo de interface e fluxos, não um serviço público
operacional. Não há backend, autenticação, integração com bases oficiais,
sincronização entre dispositivos ou verificação independente dos dados. Os
nomes, partidos, posicionamentos, votações, métricas, selos, projetos e
trajetórias são fictícios. O quiz é experimental, não cobre todas as dimensões
políticas e não constitui recomendação eleitoral.

Antes de qualquer uso com informações reais, será necessário estabelecer
fontes públicas verificáveis, critérios de atualização, proteção de dados,
segurança, acessibilidade, moderação e governança editorial.
