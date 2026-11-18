export function rankPoliticalAffinities(answers, politicians, questions) {
  const answeredQuestions = questions.filter((question) => {
    const answer = answers[question.id]
    return Number.isInteger(answer) && answer >= -2 && answer <= 2
  })

  if (!answeredQuestions.length) return []

  return politicians
    .map((politician) => {
      const compared = answeredQuestions.filter((question) =>
        Number.isInteger(politician.positions?.[question.id]),
      )
      if (!compared.length) return null

      const squaredDistance = compared.reduce((total, question) => {
        const difference = answers[question.id] - politician.positions[question.id]
        return total + difference ** 2
      }, 0)
      const distance = Math.sqrt(squaredDistance)
      const maximumDistance = 4 * Math.sqrt(compared.length)
      const score = Math.max(0, Math.min(100, Math.round((1 - distance / maximumDistance) * 100)))

      return {
        politicianId: politician.id,
        score,
        comparedQuestions: compared.length,
        axes: compared.map((question) => {
          const userValue = answers[question.id]
          const politicianValue = politician.positions[question.id]
          return {
            id: question.id,
            label: question.axisLabel || question.category || question.id,
            leftLabel: question.leftLabel || '−2',
            rightLabel: question.rightLabel || '+2',
            userValue,
            politicianValue,
            similarity: Math.round((1 - Math.abs(userValue - politicianValue) / 4) * 100),
          }
        }),
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.politicianId.localeCompare(b.politicianId))
}
