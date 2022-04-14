import { chatTemp } from './temp.js'

class ChatSocket extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.stream = this.shadowRoot.querySelector('.stream-chat')
    this.mydiv = this.shadowRoot.querySelector('.mydiv')
    this.sendBtn = this.shadowRoot.querySelector('#send')
    this.messages = this.shadowRoot.querySelector('#messages')
    this.userName = ''
    this.autoScroll = true
    this.overflow = this.shadowRoot.querySelector('.overflow')
    this.input = this.shadowRoot.querySelector('#input')
    this.connection = new WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.closeBtn = this.shadowRoot.querySelector('#close')
  }

  get template () {
    return chatTemp
  }

  /**
   * The render function is called when the component is added to the DOM.
   */
  render () {
    this.closeBtn.addEventListener('click', () => {
      this
        .remove(this)
      return false
    })
  }

  connectedCallback () {
    if (localStorage.getItem('spa_socket_username') !== null) {
      this.userName = localStorage.getItem('spa_socket_username')
    } else {
      this.userName = prompt('Enter your name:')
      localStorage.setItem('spa_socket_username', this.userName)
    }
    dragElement(this.mydiv)
    this.render()

    this.input.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.sendMessage(e.target.value)
      }
    })
    this.sendBtn.addEventListener('click', (e) => {
      this.sendMessage(this.input.value)
    })

    this.connection.addEventListener('message', (message) => {
      let resData

      try {
        resData = JSON.parse(message.data)
      } catch (error) {
        console.warn(error)
        console.warn('The message does not seem to be valid JSON.')
      }

      this.input.removeAttribute('disabled')
      this.input.focus()
      if (resData.type === 'message') {
        this.addMessage(resData)
      }

      if (this.autoScroll) {
        this.overflow.scrollTop = this.overflow.scrollHeight - this.overflow.clientHeight
      }
    })
  }

  /**
   * Send a message to the server.
   *
   * @param {string} message - The message to send to the server.
   */
  sendMessage (message) {
    if (!message) return

    const m = {
      type: 'message',
      data: `${message}`,
      username: `${this.userName}`,
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    this.input.value = ''
    this.connection.send(JSON.stringify(m))

    if (!this.userName) {
      this.userName = message
      this.sendBtn.innerHTML = 'Chat'
    }
  }

  /**
   * Create a new message element and add it to the messages element.
   *
   * @param {string} data - The data that will be sent to the server.
   */
  addMessage (data) {
    const newMsg = document.createElement('div') // DISPLAY

    const messageParity = this.addMessage.odd ? 'odd' : 'even'
    this.addMessage.odd = !this.addMessage.odd
    newMsg.setAttribute('class', `${messageParity} message`)

    newMsg.innerHTML = `
     
       <span class='name' style='color: red'>${data.username}:</span>
       <span class='text'>${data.data}</span>
     `

    this.messages.appendChild(newMsg)
  }
}

window.customElements.define('chat-temp', ChatSocket)
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
    document.onmouseup = null
    document.onmousemove = null
  }
}

document.getElementById('home-chaticon').addEventListener('click', e => {
  document.body.appendChild(document.createElement('chat-temp'))
})
