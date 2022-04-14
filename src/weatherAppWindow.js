import { weatherTemp } from './temp.js'

class Weather extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.loc = this.shadowRoot.querySelector('#city')
    this.tempC = this.shadowRoot.querySelector('#celsius')
    this.humiditySelector = this.shadowRoot.querySelector('#humidity')
    this.pressureSelector = this.shadowRoot.querySelector('#pressure')
    this.desc = this.shadowRoot.querySelector('#description')
    this.windSpeedSelector = this.shadowRoot.querySelector('#windSpeed')
    this.longitudeSelector = this.shadowRoot.querySelector('#longitude')
    this.latitudeSelector = this.shadowRoot.querySelector('#latitude')
    this.maxTempSelector = this.shadowRoot.querySelector('#max')
    this.minTempSelector = this.shadowRoot.querySelector('#min')
    this.wiconSelector = this.shadowRoot.querySelector('#wicon')
    this.api = 'cf3527c268768f6da80735900f9a746f'
    this.long = 0
    this.closeBtn = this.shadowRoot.querySelector('#close')
    this.lat = 0
    this.base = ''
    this.navigator = navigator
    this.array = []
    this.mydiv = this.shadowRoot.querySelector('.mydiv')
  }

  /**
   * Brief description of the function here.
   *
   * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
   * @param {number} position longitude
   * @param {number} d latitude
   * @param {object} s Geolocation object to get the latitude and longitude.
   */
  showPosition (position, d, s) {
    this.lat = s.coords.latitude
    this.long = s.coords.longitude

    this.iniWeather()
  }

  /**
   * Get user's location.
   */
  getLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this, this.lat, this.long))
    } else {

    }
  }

  get template () {
    return weatherTemp
  }

  render () {
    this.closeBtn.addEventListener('click', () => {
      this
        .remove(this)
      return false
    })
  }

  connectedCallback () {
    this.getLocation()

    dragElement(this.mydiv)

    this.render()
  }

  iniWeather () {
    this.base = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&appid=${this.api}&units=metric`

    fetch(this.base)
      .then(res => res.json())
      .then(data => {
        this.loc.textContent = data.name
        this.tempC.textContent = data.main.temp + '°C'
        this.desc.textContent = data.weather[0].description
        this.humiditySelector.append(data.main.humidity + '%')
        this.pressureSelector.append(data.main.pressure)
        this.windSpeedSelector.append(data.wind.speed + 'm/s')
        this.longitudeSelector.append(data.coord.lon)
        this.latitudeSelector.append(data.coord.lat)
        this.maxTempSelector.textContent = data.main.temp_max
        this.minTempSelector.textContent = data.main.temp_min
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        this.wiconSelector.src = iconUrl
      })
  }
}

/**
 * Drag element with mouse.
 *
 * @param {Event} event - Mouse event
 * @generator
 * @function dragElement
 */

/**
 * dragging the window element
 *
 * @param event
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
    /* stop moving when mouse button is released: */
    document.onmouseup = null
    document.onmousemove = null
  }
}

window.customElements.define('weather-temp', Weather)

document.getElementById('home-wethericon').addEventListener('click', e => {
  document.body.appendChild(document.createElement('weather-temp'))
})
