// Looking at a single unit...

//// Constants /////////////////////////////////////////////////////////////////

const INIT_GUESS = 0.3
const INIT_SLIP = 0.1
const INIT_LEARNED = 0.4
const MAX_LEARNED = 0.99
const INIT_TRANSIT = 0 // TODO update to estimate, 0.05?

//// Formulas //////////////////////////////////////////////////////////////////

function calcCorrect(guess, slip, learned) {
  return learned * (1 - slip) + (1 - learned) * guess
}

function calcIncorrect(guess, slip, learned) {
  return learned * slip + (1 - learned) * (1 - guess)
}

function updateLearned({ score, learned, guess, slip, transit }) {
  const posterior =
    score 
      * calcCorrect(0, slip, learned) 
      / calcCorrect(guess, slip, learned)
    + (1 - score) 
      * calcIncorrect(0, slip, learned) 
      / calcIncorrect(guess, slip, learned)
  return posterior + (1 - posterior) * transit
}

function mean (arr) {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length
}

function error (cards, param, realParam) {
  return mean(cards.map(card => (card[param] - card[realParam]) ** 2))
}

function control (cards, realParam, init) {
  return mean(cards.map(card => (init - card[realParam]) ** 2))
}

function around(value) {
  return value + Math.random() * value - 0.5 * value
}

function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

//// Mock //////////////////////////////////////////////////////////////////////

function createCards(numCards = 20) {
  return [...Array(numCards).keys()]
    .map(i => ({
      name: i,
      realGuess: around(INIT_GUESS),
      guess: INIT_GUESS,
      realSlip: around(INIT_SLIP),
      slip: INIT_SLIP,
      realTransit: INIT_TRANSIT, // TODO around(INIT_TRANSIT)
      transit: INIT_TRANSIT,
      responses: [],
    }))
}

function createLearners(numLearners = 1000) {
  return [...Array(numLearners).keys()]
    .map(i => ({ name: i, learned: INIT_LEARNED }))
}

//// Simluate //////////////////////////////////////////////////////////////////

function getScore(learner, card) {
  const correct = calcCorrect(
    card.realGuess, 
    card.realSlip, 
    learner.learned
  )
  return +(correct > Math.random())
}

function updateLearner(learner, params) {
  learner.learned = updateLearned(params)
}

function updateCard(card, params) {
  // THIS IS WHERE THE EXPERIMENT OCCURS!!!
  // card.guess = ???
  // card.slip = ???
  // card.transit = ???

  function calcGuess({ score, learned }) {
    return (score * 0.5 + 0.5) * (1 - learned)
  }

  function calcSlip({ score, learned }) {
    return (1 - (score * 0.5 + 0.5)) * learned
  }

  card.guess = card.responses.length > 30
    ? mean(card.responses.map(calcGuess))
    : INIT_GUESS
    
  card.slip = card.responses.length > 30
    ? mean(card.responses.map(calcSlip))
    : INIT_SLIP
}

function simulate(numCards, numLearners, rounds = 5000) {
  const cards = createCards(numCards)
  const learners = createLearners(numLearners)

  for (let i = 0; i < rounds; i++) {
    const card = choose(cards)
    const learner = choose(learners)

    if (learner.learned > MAX_LEARNED) continue

    const score = getScore(learner, card)
    const params = { 
      score, 
      learned: learner.learned,
      guess: card.guess,
      slip: card.slip,
      transit: card.transit
    }

    card.responses.push(params)

    // Update learner
    updateLearner(learner, params)

    // Update card
    updateCard(card, params)

    // console.log(i, learner, card)
  }

  // console.log('mean responses per card', mean(cards.map(({responses}) => responses.length)))

  return { cards, learners }
}

//// Result ////////////////////////////////////////////////////////////////////

if (require.main === module) {
  // The goal is to beat `1`.

  const { cards, learners } = simulate(20, 1000, 5000)

  const guessPerf = 
    error(cards, 'guess', 'realGuess')
    / control(cards, 'realGuess', INIT_GUESS)

  const slipPerf =
    error(cards, 'slip', 'realSlip')
    / control(cards, 'realSlip', INIT_SLIP)

  console.log(
    'mean responses per card', 
    mean(cards.map(({responses}) => responses.length))
  )

  console.log(
    (guessPerf + slipPerf) / 2,
    mean(cards.map(({guess}) => guess)),
    mean(cards.map(({slip}) => slip)),
  )
}

/*

  () => INIT_GUESS,
  () => INIT_SLIP,
  () => INIT_TRANSIT,
  () => 0,
  () => 1,
  ({ learned }) => learned,
  ({ learned }) => 1 - learned,
  ({ learned }) => 1 + learned,
  ({ learned }) => 1 / learned,
  ({ learned }) => 1 / (1 - learned),
  ({ learned }) => 1 / (1 + learned),
  ({ learned }) => learned / (1 - learned),
  ({ learned }) => learned / (1 + learned),
  ({ learned }) => (1 - learned) / learned,
  ({ learned }) => (1 - learned) / (1 + learned),
  ({ learned }) => (1 + learned) / learned,
  ({ learned }) => (1 + learned) / (1 - learned),
  ({ learned, guess, slip }) => calcCorrect(guess, slip, learned),
  ({ learned, guess, slip }) => calcIncorrect(guess, slip, learned),
  ({ learned, guess, slip }) => calcCorrect(0, slip, learned),
  ({ learned, guess, slip }) => calcIncorrect(0, slip, learned),
  ({ learned, guess, slip }) => calcCorrect(1, slip, learned),
  ({ learned, guess, slip }) => calcIncorrect(1, slip, learned),
  ({ learned, guess, slip }) => calcCorrect(guess, 0, learned),
  ({ learned, guess, slip }) => calcIncorrect(guess, 0, learned),
  ({ learned, guess, slip }) => calcCorrect(guess, 1, learned),
  ({ learned, guess, slip }) => calcIncorrect(guess, 1, learned),
  ({ learned, guess, slip }) => calcCorrect(guess, slip, 0),
  ({ learned, guess, slip }) => calcIncorrect(guess, slip, 0),
  ({ learned, guess, slip }) => calcCorrect(guess, slip, 1),
  ({ learned, guess, slip }) => calcIncorrect(guess, slip, 1),
  ({ learned, guess, slip }) => calcCorrect(0, 0, learned),
  ({ learned, guess, slip }) => calcIncorrect(0, 0, learned),
  ({ learned, guess, slip }) => calcCorrect(1, 1, learned),
  ({ learned, guess, slip }) => calcIncorrect(1, 1, learned),
  ({ learned, guess, slip }) => calcCorrect(0, 1, learned),
  ({ learned, guess, slip }) => calcIncorrect(0, 1, learned),
  ({ learned, guess, slip }) => calcCorrect(1, 0, learned),
  ({ learned, guess, slip }) => calcIncorrect(1, 0, learned),
  ({ learned, guess, slip }) => calcCorrect(0, slip, 0),
  ({ learned, guess, slip }) => calcIncorrect(0, slip, 0),
  ({ learned, guess, slip }) => calcCorrect(1, slip, 1),
  ({ learned, guess, slip }) => calcIncorrect(1, slip, 1),
  ({ learned, guess, slip }) => calcCorrect(0, slip, 1),
  ({ learned, guess, slip }) => calcIncorrect(0, slip, 1),
  ({ learned, guess, slip }) => calcCorrect(1, slip, 0),
  ({ learned, guess, slip }) => calcIncorrect(1, slip, 0),
  ({ learned, guess, slip }) => calcCorrect(guess, 0, 0),
  ({ learned, guess, slip }) => calcIncorrect(guess, 0, 0),
  ({ learned, guess, slip }) => calcCorrect(guess, 1, 1),
  ({ learned, guess, slip }) => calcIncorrect(guess, 1, 1),
  ({ learned, guess, slip }) => calcCorrect(guess, 1, 0),
  ({ learned, guess, slip }) => calcIncorrect(guess, 1, 0),
  ({ learned, guess, slip }) => calcCorrect(guess, 0, 1),
  ({ learned, guess, slip }) => calcIncorrect(guess, 0, 1),





  const totalOptions = values.length ** 6
  let option = 0

  const opt1 = []
  const opt2 = []
  const opt3 = []

  for (let a = 0; a < values.length; a++) {
    for (let b = 0; b < values.length; b++) {
      for (let c = 0; c < values.length; c++) {
        for (let d = 0; d < values.length; d++) {
          for (let e = 0; e < values.length; e++) {
            for (let f = 0; f < values.length; f++) {


  const path = [f, e, d, c, b, a]
  const { cards, learners } = simulate(20000, path)


  const foundCount = (guessPerf < 0.99) + (slipPerf < 0.99) + (transitPerf < 0.99)
  if (foundCount > 0) {
    const data = { path, guessPerf, slipPerf, transitPerf }
    if (foundCount === 1) opt1.push(data)
    if (foundCount === 2) opt2.push(data)
    if (foundCount === 3) opt3.push(data)
  }

  option++

  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`${option} of ${totalOptions}, found ${opt1.length} ${opt2.length} ${opt3.length} ... ${path.map(p => (''+p).padStart(2)).join(' ')}`)



            }
          }
        }
      }
    }
  }

*/
