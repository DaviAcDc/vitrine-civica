import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react'
import { POLITICAL_QUIZ_QUESTIONS, politicians } from '../../data/data.js'
import { useApp } from '../../context/AppContext.jsx'
import { rankPoliticalAffinities } from '../../utils/politicalQuiz.js'
import AxisComparison from './AxisComparison.jsx'

function affinityLabel(score) {
  if (score >= 80) return 'Alta proximidade nas pautas comparadas'
  if (score >= 60) return 'Proximidade parcial nas pautas comparadas'
  return 'Menor proximidade nas pautas comparadas'
}

function isCurrentResult(result) {
  return Boolean(
    result
      && POLITICAL_QUIZ_QUESTIONS.every((question) => Number.isInteger(result.answers?.[question.id]))
      && result.matches?.length
      && result.matches.every((match) => match.axes?.length === POLITICAL_QUIZ_QUESTIONS.length),
  )
}

function QuizResults({ result, onRestart }) {
  const ranked = result.matches
    .map((match) => ({
      ...match,
      politician: politicians.find((politician) => politician.id === match.politicianId),
    }))
    .filter((match) => match.politician)
  const [selectedId, setSelectedId] = useState(ranked[0]?.politicianId)
  const selectedMatch = ranked.find(({ politician }) => politician.id === selectedId) || ranked[0]

  useEffect(() => {
    if (!ranked.some(({ politician }) => politician.id === selectedId)) {
      setSelectedId(ranked[0]?.politicianId)
    }
  }, [ranked, selectedId])

  return (
    <section className="card p-6 sm:p-8" aria-live="polite">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-civic-green/10 text-civic-mint">
        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-center text-2xl font-bold text-white">Seu resultado de afinidade</h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-6 text-civic-muted">
        A afinidade é calculada pela distância euclidiana entre suas respostas e os vetores demonstrativos dos perfis. É uma comparação educativa, não uma recomendação de voto.
      </p>

      <ol className="mx-auto mt-6 max-w-3xl space-y-3">
        {ranked.map(({ politician, score, comparedQuestions }, index) => (
          <li key={politician.id}>
            <article className={`rounded-xl border p-4 transition sm:p-5 ${selectedId === politician.id ? 'border-civic-green/50 bg-civic-green/5' : 'border-civic-line bg-civic-bg/70'}`}>
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-civic-raised text-sm font-bold text-civic-cyan">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-white">{politician.name}</h3>
                      <p className="mt-0.5 text-xs text-civic-muted">{politician.role} · {politician.state} · {politician.party.acronym}</p>
                    </div>
                    <strong className="text-xl text-civic-mint">{score}%</strong>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-civic-raised">
                    <div className="h-full rounded-full bg-gradient-to-r from-civic-green to-civic-mint transition-all" style={{ width: `${score}%` }} />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-civic-muted">
                    <span>{affinityLabel(score)} · {comparedQuestions} eixos</span>
                    <button
                      type="button"
                      className="font-medium text-civic-cyan hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-cyan/60"
                      aria-pressed={selectedId === politician.id}
                      onClick={() => setSelectedId(politician.id)}
                    >
                      {selectedId === politician.id ? 'Comparativo selecionado' : 'Comparar eixos'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
      {!ranked.length && <p className="mt-6 text-center text-sm text-civic-muted">Não foi possível calcular afinidades com as respostas salvas.</p>}

      {selectedMatch && (
        <div className="mx-auto mt-8 max-w-3xl">
          <AxisComparison
            axes={selectedMatch.axes}
            title={`Comparativo de eixos · ${selectedMatch.politician.name}`}
          />
        </div>
      )}

      <p className="mx-auto mt-6 max-w-3xl rounded-lg border border-civic-amber/20 bg-civic-amber/5 p-4 text-xs leading-5 text-civic-muted">
        Este quiz é experimental. Nomes, partidos, projetos e posicionamentos são fictícios; as questões não abrangem todas as dimensões políticas. As respostas ficam salvas apenas neste navegador.
      </p>
      <div className="mt-6 text-center">
        <button type="button" className="btn" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Refazer quiz
        </button>
      </div>
    </section>
  )
}

export default function PoliticalQuiz() {
  const { data, saveQuizResult } = useApp()
  const savedResult = data.viewer.quizResult
  const currentResult = isCurrentResult(savedResult) ? savedResult : null
  const [answers, setAnswers] = useState(currentResult?.answers || {})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [result, setResult] = useState(currentResult)
  const question = POLITICAL_QUIZ_QUESTIONS[currentIndex]
  const progress = result ? 100 : (Object.keys(answers).filter((id) => POLITICAL_QUIZ_QUESTIONS.some((item) => item.id === id)).length / POLITICAL_QUIZ_QUESTIONS.length) * 100

  useEffect(() => {
    if (savedResult && !currentResult) saveQuizResult(null)
    setAnswers(currentResult?.answers || {})
    setResult(currentResult)
    setCurrentIndex(0)
  }, [savedResult, currentResult, saveQuizResult])

  const restart = () => {
    setAnswers({})
    setResult(null)
    setCurrentIndex(0)
    saveQuizResult(null)
  }

  const finishQuiz = () => {
    const matches = rankPoliticalAffinities(answers, politicians, POLITICAL_QUIZ_QUESTIONS)
    const completed = { answers, matches, completedAt: new Date().toISOString() }
    saveQuizResult(completed)
    setResult(completed)
  }

  return (
    <section className="animate-fade-in mx-auto w-full max-w-4xl space-y-5">
      <header className="card bg-steam-header p-6 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-civic-green/30 bg-civic-green/10 text-civic-mint">
          <Sparkles className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-civic-mint">Questionário demonstrativo · 12 eixos</p>
        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Descubra seu alinhamento</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-civic-text">
          Responda a afirmações sobre políticas públicas em uma escala de cinco níveis e compare suas respostas com os posicionamentos fictícios do Hub.
        </p>
      </header>

      {result ? (
        <QuizResults result={result} onRestart={restart} />
      ) : (
        <section className="card p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="chip">{question.category}</span>
            <span className="text-civic-muted">Questão {currentIndex + 1} de {POLITICAL_QUIZ_QUESTIONS.length}</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-civic-raised" role="progressbar" aria-label="Progresso do questionário" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
            <div className="h-full rounded-full bg-gradient-to-r from-civic-green to-civic-mint transition-all" style={{ width: `${progress}%` }} />
          </div>

          <fieldset className="mt-7">
            <legend className="text-xl font-semibold leading-8 text-white sm:text-2xl">{question.prompt}</legend>
            <p className="mt-2 text-xs text-civic-muted">Eixo: {question.leftLabel} ↔ {question.rightLabel}</p>
            <div className="mt-5 space-y-2.5">
              {question.options.map((option) => {
                const checked = answers[question.id] === option.value
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${checked ? 'border-civic-green/60 bg-civic-green/10 text-white' : 'border-civic-line bg-civic-bg/50 text-civic-text hover:border-civic-cyan/40'}`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={checked}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.value }))}
                      className="mt-1 accent-civic-green"
                    />
                    <span className="text-sm leading-6">{option.label}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <button type="button" className="btn" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Anterior
            </button>
            {currentIndex < POLITICAL_QUIZ_QUESTIONS.length - 1 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setCurrentIndex((index) => index + 1)}
                disabled={!Number.isInteger(answers[question.id])}
              >
                Próxima questão <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={finishQuiz}
                disabled={POLITICAL_QUIZ_QUESTIONS.some((item) => !Number.isInteger(answers[item.id]))}
              >
                Ver resultado <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </section>
      )}
    </section>
  )
}
