# Vitrine Cívica

> **Projeto em desenvolvimento — protótipo demonstrativo.** Ainda não é um
> serviço oficial, não está pronto para uso institucional e não representa
> dados reais de pessoas, partidos, mandatos ou projetos de lei.

A Vitrine Cívica explora uma forma mais acessível e interativa de acompanhar a
atividade de representantes públicos. A ideia combina a familiaridade dos
perfis de jogos e dos repositórios de código com informações cívicas: projetos
de lei ganham histórico e documentação em linguagem simples, enquanto cidadãos
podem acompanhar atualizações, apoiar propostas e participar de conversas.

## Objetivo da ideia

O objetivo é tornar mais fácil entender **o que um mandato está fazendo, como
as propostas avançam e onde a população pode acompanhar ou participar**. Em vez
de tratar cada projeto como um documento isolado, a interface apresenta sua
tramitação como um histórico, com emendas, temas e explicações acessíveis.

O perfil, o nível de experiência e o mapa de atividade são elementos de
gamificação para facilitar a leitura e incentivar transparência. Eles não
medem a qualidade de um mandato e não devem ser interpretados como avaliação
oficial de desempenho.

## Estado atual

Esta versão é um **MVP visual em desenvolvimento**, feito para explorar a
interface e os fluxos principais com dados fictícios. Os dados ficam somente
no `localStorage` do navegador. Ainda não há servidor, banco de dados,
autenticação, integração com fontes oficiais, sincronização entre dispositivos
ou moderação de conteúdo.

Não use este protótipo para publicar, verificar ou tomar decisões sobre
informações políticas reais. Antes de qualquer uso público, será necessário
validar fontes e dados, privacidade, segurança, acessibilidade e regras de
participação.

## Funcionalidades demonstrativas

- Perfil com cargo, partido, biografia, badges e XP.
- Heatmap anual de atividades cívicas.
- Projetos de lei com status, temas, apoios, emendas, README e histórico.
- Trajetória com mandatos, experiência profissional e formação.
- Feed de atualizações, reações e comentários.
- Modo de edição simulado para criar projetos, atualizar tramitações e publicar
  atualizações.
- Persistência local no navegador e opção de restaurar os dados de demonstração.

Os nomes, partidos, instituições, projetos, números e publicações incluídos no
protótipo são fictícios. As interações são locais e não são enviadas a
representantes públicos.

## Como executar

Requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

O Vite informa no terminal o endereço local do site (normalmente
`http://localhost:5173`).

Para validar a compilação de produção:

```bash
npm run build
npm run preview
```

## Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Lucide React

## Estrutura do projeto

```text
.
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── data/
    │   └── data.js                 # dados fictícios e configurações
    ├── context/
    │   └── AppContext.jsx          # estado, ações e persistência
    ├── hooks/
    │   └── useLocalStorage.js
    ├── utils/
    │   └── helpers.js
    └── components/
        ├── dashboard/              # painel de edição demonstrativo
        ├── feed/                   # publicações, reações e comentários
        ├── heatmap/
        ├── layout/
        ├── profile/
        ├── projects/
        └── timeline/
```

## Persistência e modo de edição

O botão no cabeçalho alterna entre a visão de cidadão e o modo de edição
simulado. No modo de edição, o painel permite criar projetos e atualizações;
também é possível alterar o status dos projetos. Essas ações atualizam a
interface e são gravadas no `localStorage` deste navegador.

As alterações não são compartilhadas com outros usuários. Use **Resetar demo**
no cabeçalho para voltar aos dados fictícios iniciais. A chave atual dos dados
é `vitrine-civica:v1`.

## Próximos passos possíveis

- Definir fontes públicas e um processo verificável de atualização de dados.
- Projetar backend, autenticação e autorização antes de qualquer uso real.
- Avaliar privacidade, segurança, acessibilidade e moderação.
- Criar testes automatizados para os fluxos e regras de negócio.
- Validar a proposta com cidadãos e especialistas em transparência pública.

## Contribuições

Como o projeto ainda está em desenvolvimento, sugestões e contribuições são
bem-vindas. Descreva claramente o problema ou a proposta e tenha em mente que
funcionalidades, estrutura e requisitos podem mudar.
