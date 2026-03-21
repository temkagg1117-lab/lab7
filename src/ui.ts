import { FlashCard } from './cards/flashcard.js'
import { CardDeck } from './ordering/cardproducer.js'
import { CardStatus } from './cards/cardstatus.js'
import readline from 'readline-sync'

interface UI {
  studyCards: (producer: CardDeck) => void
};

function newUI (): UI {

  function cueAllCards (producer: CardDeck): void {
    for (const cardStatus of producer.getCards()) {
      const card = cardStatus.getCard()
      const correctAnswer = cueCard(card)
      cardStatus.recordResult(correctAnswer)
    }
  };

  function cueCard (card: FlashCard): boolean {
    const question = card.getQuestion()
    const answer = card.getAnswer()

    console.log('\nNext cue: ' + question)
    const line = readline.question('answer> ')
    const success = card.checkSuccess(line)

    if (success) {
      console.log("That's correct!")
    } else {
      console.log('That is incorrect; the correct response was: ' + answer)
    }

    return success
  };

  // ⭐ Achievement checker (шууд дотор нь хийсэн)
  function checkAchievements(cards: CardStatus[]): void {
    let allCorrect = true

    for (const card of cards) {
      const results = card.getResults()

      // CORRECT
      if (results.length === 0 || results[results.length - 1] === false) {
        allCorrect = false
      }

      // REPEAT
      if (results.length >= 5) {
        console.log('🏆 REPEAT: Answered a card 5+ times')
      }

      // CONFIDENT
      const correctCount = results.filter(r => r === true).length
      if (correctCount >= 3) {
        console.log('🏆 CONFIDENT: 3+ correct answers on a card')
      }
    }

    if (allCorrect) {
      console.log('🏆 CORRECT: All cards correct this round')
    }
  }

  return {

    studyCards (producer: CardDeck): void {
      while (!producer.isComplete()) {
        console.log(`${producer.countCards()} cards to go...`)

        cueAllCards(producer)

        // ⭐ ЭНД achievement ажиллана
        checkAchievements(producer.getCards())

        console.log('Reached the end of the card deck, reorganizing...')
        producer.reorganize()
      }

      console.log('Finished all cards. Yay.')
    }

  }
};

export { newUI }