import { CardStatus } from './cards/cardstatus.js'

export function checkAchievements(cards: CardStatus[]): void {
  let allCorrect = true

  for (const card of cards) {
    const results = card.getResults()

    
    if (results.length === 0 || results[results.length - 1] === false) {
      allCorrect = false
    }

    
    if (results.length >= 5) {
      console.log('REPEAT: Answered a card 5+ times')
    }

   
    const correctCount = results.filter(r => r === true).length
    if (correctCount >= 3) {
      console.log('CONFIDENT: 3+ correct answers on a card')
    }
  }

  
  if (allCorrect) {
    console.log('CORRECT: All cards answered correctly in this round')
  }
}