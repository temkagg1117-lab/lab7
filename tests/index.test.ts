import { newFlashCard } from '../src/cards/flashcard.js'
import { newInMemoryCardStore } from '../src/data/store.js'
import { buildDeck, parseArgs } from '../src/index.js'

describe('CLI helpers', () => {
  test('parseArgs uses the documented defaults', () => {
    const argv = parseArgs(['cards/designpatterns.csv'])

    expect(argv.order).toBe('random')
    expect(argv.repetitions).toBeUndefined()
    expect(argv.invertCards).toBe(false)
    expect(argv._[0]).toBe('cards/designpatterns.csv')
  })

  test('parseArgs accepts explicit CLI options', () => {
    const argv = parseArgs([
      'cards/designpatterns.csv',
      '--order',
      'recent-mistakes-first',
      '--repetitions',
      '3',
      '--invertCards'
    ])

    expect(argv.order).toBe('recent-mistakes-first')
    expect(argv.repetitions).toBe(3)
    expect(argv.invertCards).toBe(true)
  })

  test('buildDeck without repetitions asks each card only once', () => {
    const deck = buildDeck(
      newInMemoryCardStore([newFlashCard('Question', 'Answer')]),
      'random'
    )

    const [card] = deck.getCards()
    card.recordResult(false)
    deck.reorganize()

    expect(deck.isComplete()).toBe(true)
  })

  test('buildDeck with repetitions keeps cards until enough correct answers', () => {
    const deck = buildDeck(
      newInMemoryCardStore([newFlashCard('Question', 'Answer')]),
      'worst-first',
      2
    )

    const [card] = deck.getCards()

    card.recordResult(true)
    deck.reorganize()
    expect(deck.isComplete()).toBe(false)

    card.recordResult(true)
    deck.reorganize()
    expect(deck.isComplete()).toBe(true)
  })
})
