import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

export class RecentMistakesFirstSorter implements CardOrganizer {
  reorganize(cards: CardStatus[]): CardStatus[] {
    const recentMistakes: CardStatus[] = []
    const others: CardStatus[] = []

    for (const card of cards) {
      const results = card.getResults()

      // хамгийн сүүлд буруу байсан уу?
      if (results.length > 0 && results[results.length - 1] === false) {
        recentMistakes.push(card)
      } else {
        others.push(card)
      }
    }

    // дараалал алдагдахгүй!
    return [...recentMistakes, ...others]
  }
}