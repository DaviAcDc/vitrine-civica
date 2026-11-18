import assert from 'node:assert/strict'
import test from 'node:test'
import { BRAZIL_UFS, POLITICAL_QUIZ_QUESTIONS, politicians } from '../data/data.js'
import { rankPoliticalAffinities } from './politicalQuiz.js'

const questions = [{ id: 'public-services' }]

test('returns full affinity when answers match a profile position', () => {
  const ranked = rankPoliticalAffinities(
    { 'public-services': 1 },
    [{ id: 'matching', positions: { 'public-services': 1 } }],
    questions,
  )

  assert.equal(ranked[0].politicianId, 'matching')
  assert.equal(ranked[0].score, 100)
  assert.equal(ranked[0].comparedQuestions, 1)
  assert.deepEqual(ranked[0].axes, [{
    id: 'public-services',
    label: 'public-services',
    leftLabel: '−2',
    rightLabel: '+2',
    userValue: 1,
    politicianValue: 1,
    similarity: 100,
  }])
})

test('returns zero affinity for opposite answers and positions', () => {
  const ranked = rankPoliticalAffinities(
    { 'public-services': -2 },
    [{ id: 'opposite', positions: { 'public-services': 2 } }],
    questions,
  )

  assert.equal(ranked[0].score, 0)
})

test('uses normalized Euclidean distance across multiple axes', () => {
  const ranked = rankPoliticalAffinities(
    { first: 2, second: 2 },
    [{ id: 'near', positions: { first: 1, second: 2 } }],
    [{ id: 'first', axisLabel: 'Primeiro eixo' }, { id: 'second' }],
  )

  assert.equal(ranked[0].score, 82)
  assert.deepEqual(ranked[0].axes.map(({ similarity }) => similarity), [75, 100])
})

test('ignores invalid answers and profiles without comparable positions', () => {
  const ranked = rankPoliticalAffinities(
    { 'public-services': 3 },
    [{ id: 'missing-position', positions: {} }],
    questions,
  )

  assert.deepEqual(ranked, [])
})

test('provides a complete profile and quiz vector for every Brazilian UF', () => {
  const expectedUfs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ]

  assert.deepEqual(BRAZIL_UFS.map(({ uf }) => uf), expectedUfs)
  assert.equal(politicians.length, 29)
  assert.equal(new Set(politicians.map(({ id }) => id)).size, politicians.length)
  assert.equal(POLITICAL_QUIZ_QUESTIONS.length, 12)
  assert.equal(new Set(politicians.map(({ positions }) => JSON.stringify(positions))).size, politicians.length)
  for (const { uf } of BRAZIL_UFS) {
    const statePoliticians = politicians.filter((politician) => politician.state === uf)
    assert.ok(statePoliticians.length >= 1, `expected a profile for ${uf}`)
    for (const politician of statePoliticians) {
      assert.ok(politician.metrics.transparency >= 0)
      assert.ok(politician.metrics.presence >= 0)
      assert.ok(politician.metrics.quotaUsePct >= 0)
      assert.ok(politician.profile.handle)
      assert.ok(politician.profile.xp > 0)
      assert.ok(politician.badges.length > 0)
      assert.ok(politician.transparencyBadges.length > 0)
      assert.ok(politician.projects.length > 0)
      assert.ok(politician.projects.every((project) => project.readme && project.tags.length && project.status))
      assert.ok(politician.history.length > 0)
      assert.ok(politician.posts.length > 0)
      assert.ok(Object.keys(politician.activity).length > 0)
      assert.ok(politician.votes.length > 0)
      assert.ok(politician.timeline.mandates.length > 0)
      assert.ok(politician.timeline.experience.length > 0)
      assert.ok(politician.timeline.education.length > 0)
      for (const question of POLITICAL_QUIZ_QUESTIONS) {
        assert.ok(Number.isInteger(politician.positions[question.id]), `${politician.name} is missing ${question.id}`)
        assert.ok(politician.positions[question.id] >= -2 && politician.positions[question.id] <= 2)
        assert.deepEqual(question.options.map(({ value }) => value), [-2, -1, 0, 1, 2])
      }
    }
  }
})

test('produces varied rankings for the complete politician catalog', () => {
  const answers = Object.fromEntries(POLITICAL_QUIZ_QUESTIONS.map(({ id }) => [id, 0]))
  const ranked = rankPoliticalAffinities(answers, politicians, POLITICAL_QUIZ_QUESTIONS)

  assert.equal(ranked.length, politicians.length)
  assert.equal(new Set(ranked.map(({ score }) => score)).size > 1, true)
  assert.ok(ranked.every(({ axes }) => axes.length === POLITICAL_QUIZ_QUESTIONS.length))
})
