import { gameTemp } from './temp.js'

class Game extends window.HTMLElement {
  constructor (size) {
    super()
    this.size = size

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.cardsArray = []
    this.matches = []
    this.deck = this.shadowRoot.querySelector('.deck')
    this.counter = this.shadowRoot.querySelector('.moves')
    this.moves = 0
    this.gameInterval = null

    this.displayTime = this.shadowRoot.querySelector('.displayTime')
    this.container = this.shadowRoot.querySelector('.container')
    this.started = false
    this.closeBtn = this.shadowRoot.querySelector('#close')
    this.mydiv = this.shadowRoot.querySelector('.mydiv')
    this.cardsArrayCounter = 0
    this.colCounter = 1
    this.col = 1
    this.row = 1
    this.b4 = ''
    this.rc = ''
    this.switchSizes = 0
    this.switchSizes2 = 0
  }

  connectedCallback () {
    this.mydiv.style.zIndex = '1'
    this.render()
    dragElement(this.mydiv)

    this.gameStart()
  }

  /**
   * Remove all child nodes from the parent node.
   *
   * @param {Element} parent - The parent node to remove all child nodes from.
   */
  removeAllChildNodes (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  }

  disconnectedCallback () {

  }

  attributeChangedCallback (name, oldValue, newValue) {

  }

  adoptedCallback () {

  }

  render () {
    this.creatDeck()

    this.closeBtn.addEventListener('click', () => {
      this
        .remove(this)
      return false
    })
  }

  /**
   * It returns the template that is used to render the game.
   *
   * @returns {HTMLTemplateElement} The template object.
   */
  get template () {
    return gameTemp
  }

  /**
   * Generate a random integer between two numbers.
   *
   * @param {number} min - The minimum value of the random number.
   * @param {number} max - The maximum value you want to return.
   * @returns {number} The random number between the min and max values.
   */
  randomIntFromInterval (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  /**
   * Creates a deck of cards by appending the card image to the cards array.
   */
  creatDeck () {
    for (let i = 0; i < this.size / 2; i++) {
      const card = `./image/${this.randomIntFromInterval(2, 8)}.png`

      this.cardsArray.push(card)
      this.cardsArray.push(card)
    }
  }

  /**
   * Given an array, shuffle the array.
   *
   * @param {Array} array - The array to be shuffled.
   * @returns {Array} The array is being returned.
   */
  shuffle (array) {
    let currentIndex = array.length
    let temporaryValue; let randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  /**
   * It initializes the game by finding all the cards and setting up the click handler.
   */
  init () {
    this.cards = this.shadowRoot.querySelectorAll('.card')
    this.clickHandler()
  }

  /**
   * Create a deck of cards and shuffle them.
   */
  gameStart () {
    this.cardsArray = this.shuffle(this.cardsArray)
    let s = this.size / 2
    if (this.size === 16) {
      s = this.size / 4
    }

    this.deck.style.setProperty('grid-template-columns', `repeat(${s}, 1fr)`)

    this.cardsArray.forEach(element => {
      const card = document.createElement('img')
      const li = document.createElement('li')
      li.classList.add('card')
      this.cardsArrayCounter++
      if (this.size === 4) {
        if (this.cardsArrayCounter === 3) {
          this.colCounter++
          this.cardsArrayCounter = 1
        }
      }
      if (this.cardsArrayCounter === 5 || this.cardsArrayCounter === 9 || this.cardsArrayCounter === 13 || this.cardsArrayCounter === 17) {
        this.colCounter++
        this.cardsArrayCounter = 1
      }
      li.setAttribute('id', 'col' + this.colCounter + 'card' + this.cardsArrayCounter)

      card.setAttribute('class', 'hide')
      card.src = element
      li.appendChild(card)
      this.deck.appendChild(li)
    })
    this.displayTime.innerHTML = '00:00'
    this.init()
    this.timer(this.displayTime)
    console.dir(document.body.childNodes[document.body.childNodes.length - 1])
    document.addEventListener('keydown', this.processKeyDown.bind(this), true)
  }

  /**
   * It adds an event listener to each card.
   */
  clickHandler () {
    this.cards.forEach(card => {
      card.addEventListener('click', () => {
        this.started = true
        this.displaySymbol(card)
      })
    })
  }

  /**
   * This function checks if all the cards are flipped over. If they are, it will end the game and display the time it took and the number of moves to finish the game.
   */
  checkForWin () {
    const cardsChecker = Array.from(this.cards)
    const check = cardsChecker.every((btn) => btn.children[0].classList.contains('showimg'))
    if (check) {
      this.endOfGame()
      const div = document.createElement('div')
      div.classList.add('popup')

      div.innerHTML = `<div class="popup" name="popup">
              <a href="#" class="close"></a>
              
              <div class="first-block">
                <i class="fas fa-check-circle"></i>
              </div>
            
              <div class="second-block">
                <h3>Congratulations!</h3>
                <p>It took you ${this.counter.innerHTML} and ${this.displayTime.innerHTML} to finish the game</p>
               
                </div> `

      this.removeAllChildNodes(this.deck)
      this.deck.appendChild(div)
    }
  }

  processKeyDown (e) {
    e.preventDefault()

    var keyCode

    if (e.which) {
      keyCode = e.which
    } else {
      alert('Unknown event type.')
      return
    }
    e.stopPropagation()
    this.processKeyHandle(keyCode)
  }

  gridController () {
    this.rc = 'col' + this.row + 'card' + this.col

    if (this.b4 === '') this.b4 = this.rc

    this.shadowRoot.querySelector('#' + this.b4).classList.remove('focus')

    this.b4 = this.rc
    this.shadowRoot.querySelector('#' + this.rc).classList.add('focus')
  }

  processKeyHandle (keyCode) {
    this.switchSizes = this.size / 2
    this.switchSizes2 = 2
    if (this.size === 16 || this.size === 8) {
      this.switchSizes = this.size / 4
      this.switchSizes2 = 4
    }
    console.dir(this)

    switch (keyCode) {
      case 37:
        if (this.col > 1) this.col--
        this.gridController()
        break
      case 38:
        if (this.row > 1) this.row--
        this.gridController()
        break
      case 39:
        if (this.col < this.switchSizes2) this.col++
        this.gridController()
        break
      case 40:
        if (this.row < this.switchSizes) this.row++
        this.gridController()
        break
      case 13:
        this.shadowRoot.querySelector('#' + this.rc).click()
        break
    }
  }

  /**
   * This function is called when a card is clicked. It adds the card's symbol to the matches array.If the matches array has two elements, it moves the counter and checks if the two elements are equal. If they are equal, it removes the matches array and resets the cards. If they are not equal, it sets a timeout of 1 second and resets the cards. It also checks if the user has won.
   *
   * @param {Element} card - The card that was clicked.
   */
  displaySymbol (card) {
    this.matches.push(card.children[0].attributes[1].nodeValue)
    if (card.children[0].classList.contains('hide')) {
      card.children[0].classList.remove('hide')
      card.children[0].classList.add('showimg')
    }

    if (this.matches.length === 2) {
      this.moveCounter(this.moves, this.counter)

      this.cards.forEach(card => {
        card.style.pointerEvents = 'none'
      })
      if (this.matches[0] === this.matches[1]) {
        this.matches = []
        this.cards.forEach(card => {
          card.style.pointerEvents = ''
        })
      } else {
        setTimeout(() => {
          this.cards.forEach(card => {
            card.children[0].classList.remove('showimg')
            card.children[0].classList.add('hide')
          })
          this.matches = []
          this.cards.forEach(card => {
            card.style.pointerEvents = ''
          })
        }, 1000)
      }

      this.checkForWin()
    }
  }

  toggleButton () {
    this.button.classList.toggle('hide')
  }

  /**
   * This function will create a timer that will count the time in seconds.
   *
   * @param {Element} displayTime - The element that will be updated with the time.
   */
  timer (displayTime) {
    let minutes = 0
    let seconds = 0
    this.gameInterval = setInterval(function () {
      seconds = parseInt(seconds, 10) + 1
      minutes = parseInt(minutes, 10)
      if (seconds >= 60) {
        minutes += 1
        seconds = 0
      }

      seconds = seconds < 10 ? '0' + seconds : seconds
      minutes = minutes < 10 ? '0' + minutes : minutes

      displayTime.innerHTML = minutes + ':' + seconds
    }, 1000)
  }

  endOfGame () {
    clearInterval(this.gameInterval)
  }

  moveCounter (moves, counter) {
    this.moves++
    this.counter.innerHTML = this.moves
  }
}

window.customElements.define('game-app', Game)
/**
 * Drag element with mouse.
 *
 * @param {Event} event - Mouse event
 * @generator
 * @function dragElement
 */
function dragElement (event) {
  const elmnt = event

  let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0
  if (document.getElementById(elmnt.attributes[1] + 'header')) {
    /* if present, the header is where you move the DIV from: */
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV: */
    elmnt.onmousedown = dragMouseDown
  }
  /**
   * Drag element with mouse.
   *
   * @param {Event} e - Mouse event
   * @function dragMouseDown
   */
  function dragMouseDown (e) {
    let zIndex = parseInt(this.style.zIndex)
    zIndex = zIndex + 10

    this.style.zIndex = zIndex.toString()
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }
  /**
   * Drag element with mouse.
   *
   * @param {Event} e  - Mouse event
   * @function elementDrag
   */
  function elementDrag (e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
    elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
  }

  /**
   * Close drag element with mouse.
   *
   * @function closeDragElement
   */
  function closeDragElement () {
    /* stop moving when mouse button is released: */
    document.onmouseup = null
    document.onmousemove = null
  }
}
const size4 = document.getElementById('2x2')
const size8 = document.getElementById('4x2')
const size16 = document.getElementById('4x4')

size4.addEventListener('click', e => {
  document.body.appendChild(new Game(4))
})

size8.addEventListener('click', e => {
  document.body.appendChild(new Game(8))
})
size16.addEventListener('click', e => {
  document.body.appendChild(new Game(16))
})
