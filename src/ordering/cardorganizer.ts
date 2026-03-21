import { CardStatus } from '../cards/cardstatus.js'

export interface CardOrganizer {
  reorganize(cards: CardStatus[]): CardStatus[]
}

export function newCombinedCardOrganizer(cardOrganizers: CardOrganizer[]): CardOrganizer {
  return {
    reorganize(cards: CardStatus[]): CardStatus[] {
      let status = cards.slice()
      for (const organizer of cardOrganizers) {
        status = organizer.reorganize(status)
      }
      return status
    }
  }
}