/** @type {import('tailwindcss').Config} */
// Paleta: azul-marinho da Steam + grafite do GitHub Dark Dimmed,
// com destaques em verde (conquistas) e ciano (links/acoes).
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        civic: {
          bg: '#16202b',        // fundo da pagina
          nav: '#101822',       // barra superior
          surface: '#1b2838',   // cards (azul-marinho Steam)
          raised: '#22303f',    // inputs, hover, chips
          line: '#2f4256',      // bordas
          graphite: '#2d333b',  // grafite (GitHub Dark Dimmed)
          text: '#c7d5e0',      // texto principal
          muted: '#8b9bb0',     // texto secundario
          cyan: '#66c0f4',      // destaque Steam
          green: '#57ab5a',     // conquistas / sucesso
          mint: '#7ee2a8',      // verde claro para textos
          amber: '#e3b341',     // alertas / ouro
          danger: '#e5534b',
        },
        // Niveis do heatmap de contribuicoes (0 = sem atividade)
        heat: {
          0: '#1e2a37',
          1: '#0e4429',
          2: '#006d32',
          3: '#26a641',
          4: '#39d353',
        },
      },
      fontFamily: {
        sans: ['Inter', '"Motiva Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'steam-header': 'linear-gradient(135deg, #1b2838 0%, #223a52 55%, #2a475e 100%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(102,192,244,.25), 0 8px 24px rgba(0,0,0,.35)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in .3s ease-out both',
      },
    },
  },
  plugins: [],
}
