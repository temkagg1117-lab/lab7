import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { CardStore, loadCards } from './data/store.js'
import { newUI } from './ui.js'
import { newCardDeck } from './ordering/cardproducer.js'
import { CardOrganizer, newCombinedCardOrganizer } from './ordering/cardorganizer.js'
import { newCardShuffler } from './ordering/prioritization/cardshuffler.js'
import { newMostMistakesFirstSorter } from './ordering/prioritization/mostmistakes.js'
import { RecentMistakesFirstSorter } from './ordering/prioritization/recentmistakes.js'
import { newNonRepeatingCardOrganizer, newRepeatingCardOrganizer } from './ordering/repetition/cardrepeater.js'

type OrderOption = 'random' | 'worst-first' | 'recent-mistakes-first'
const organizer = new RecentMistakesFirstSorter()
interface CliArgs {
  help?: boolean
  order: OrderOption
  repetitions?: number
  invertCards: boolean
  _: Array<string | number>
}

function printHelp (): void {
  console.log(`Usage: flashcard <cards-file> [options]

Options:
--help                         Тусламжийн мэдээлэл харуулах
--order <order>                Зохион байгуулалтын төрөл, default нь "random"
                               [choices: "random", "worst-first", "recent-mistakes-first"]
--repetitions <num>            Нэг картыг хэдэн удаа зөв хариулахыг шаардлага болгоно.
                               Хэрэв тодорхойлохгүй бол зөвхөн нэг удаа асууна.
--invertCards                  Картын асуулт, хариултыг сольж харуулна.
                               Default: false`)
}

function newOrderingStrategy (order: OrderOption): CardOrganizer {
  switch (order) {
    case 'worst-first':
      return newMostMistakesFirstSorter()
    case 'recent-mistakes-first':
      return new RecentMistakesFirstSorter()
    case 'random':
    default:
      return newCardShuffler()
  }
}

function newRepetitionStrategy (repetitions?: number): CardOrganizer {
  return repetitions === undefined
    ? newNonRepeatingCardOrganizer()
    : newRepeatingCardOrganizer(repetitions)
}

function buildDeck (cards: CardStore, order: OrderOption, repetitions?: number) {
  const organizer = newCombinedCardOrganizer([
    newRepetitionStrategy(repetitions),
    newOrderingStrategy(order)
  ])

  return newCardDeck(cards.getAllCards(), organizer)
}

function parseArgs (args: string[]): CliArgs {
  return yargs(args)
    .scriptName('flashcard')
    .help(false)
    .version(false)
    .usage('Usage: flashcard <cards-file> [options]')
    .option('help', {
      type: 'boolean',
      default: false
    })
    .option('order', {
      type: 'string',
      choices: ['random', 'worst-first', 'recent-mistakes-first'] as const,
      default: 'random'
    })
    .option('repetitions', {
      type: 'number',
      requiresArg: true
    })
    .option('invertCards', {
      type: 'boolean',
      default: false
    })
    .check((argv) => {
      if (!argv.help && argv._.length === 0) {
        throw new Error('cards-file is required')
      }

      if (argv.repetitions !== undefined && (!Number.isInteger(argv.repetitions) || argv.repetitions < 1)) {
        throw new RangeError('--repetitions must be a positive integer')
      }

      return true
    })
    .parseSync() as CliArgs
}

function runCli (args: string[]): void {
  const argv = parseArgs(args)

  if (argv.help) {
    printHelp()
    return
  }

  const cardsFile = String(argv._[0])
  const store = loadCards(cardsFile)
  const cards = argv.invertCards ? store.invertCards() : store
  const deck = buildDeck(cards, argv.order, argv.repetitions)

  newUI().studyCards(deck)
}

if (require.main === module) {
  runCli(hideBin(process.argv))
}

export { buildDeck, newOrderingStrategy, newRepetitionStrategy, parseArgs, printHelp, runCli }