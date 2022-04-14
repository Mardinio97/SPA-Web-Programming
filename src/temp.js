export const weatherTemp = document.createElement('template')

weatherTemp.innerHTML = `

<div class="mydiv" id="mydiv">
<span id='close'>x</span>
  <div id="mydivheader">
    <h1>Weather app</h1>


  </div>
<div class="container">
<div class="title">
  <h1 id="city"></h1>
  <div id="graphic" class="weather-icon">
    <img id="wicon" src="" alt="Weather icon">
  </div>
  <div id="description" class='important-info text'></div>
  <div id="farenheit" class="temp-info"></div>
  <div id="celsius" class="temp-info"></div>
</div>
</div>
<div class="description-container">
<div class="block-1">
  <div class="text">
    <span>Max</span>
    <span id="max" class="important-info"> </span>
  </div>
  <div class="text">
    <span>Min</span>
  <span id="min" class='important-info'> </span>
  </div>
  
</div>
<div class="block-2">
  <div id="longitude" class=" text important-info">Lon: </div>
  <div id="latitude" class="text important-info">Lat: </div>
</div>
<div class="block-3">
  <div id="humidity" class="text important-info">Humidity: </div>
  <div id="pressure" class="text important-info">Pressure: </div>
  <div id="windSpeed" class="text important-info">Winds: </div>
</div>
</div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css?family=Space+Mono');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:200,400,600,700,800');

body {
  height: 100%;
  background: #C95E67;
  /* fallback for old browsers */
}

h1 {
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-size: 29px;
  color: #C95E67;
}

.text{
  font-family: 'Space Mono', Helvetica, sans-serif;
  font-size: 14px;
  color: #333;
}

#close {
  float:right;
  display:inline-block;
  padding:2px 5px;
  background:#ccc;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 40px 0px 10px 0;
}

.container-button {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 10px;
}

.weather-icon,
.title{
  grid-column: 1/4;
  margin: 0 auto;
  text-align: center;
  background: #efefef;
  border-radius: 4px;
  padding: 10px 87px;
}

.important-info{ 
  grid-column: 1;
}

.description-container{
  background: #efefef;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 450px;
  margin: 0 auto;
  padding:20px 0px;
}

.block-1 {
  grid-column: 1;
  padding: 10px;
}
.block-2{
  grid-column: 2;
  padding: 10px;
}
.block-3{
  grid-column: 3;
  padding: 10px;
}

.weatherInfo {
  height: 100%;
}

.temp-info {
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-size: 65px;
  color: #C95E67;
  font-weight: 600;
}

.switch-button {
  grid-column: 1 1 1;
  border-radius: 4px;
  margin: 0 auto;
  width: 400px;
  height: 40px;
  text-align: center;
  position: relative;
  will-change: transform;
  z-index: 197 !important;
  cursor: pointer;
  -webkit-transition: .3s ease all;
  transition: .3s ease all;
  border: 1px solid #efefef;
  display: inline-block;
}

.switch-button-case {
  display: inline-block;
  background: none;
  width: 49%;
  height: 100%;
  color: #efefef;
  position: relative;
  border: none;
  -webkit-transition: .3s ease all;
  transition: .3s ease all;
  text-transform: uppercase;
  letter-spacing: 5px;
  padding-bottom: 1px;
}

.switch-button-case:hover {
  color: #151515;
  cursor: pointer;
}

.switch-button-case:focus {
  outline: none;
}

.active {
  position: absolute;
  color: #151515;
  background-color: #efefef;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: -1;
  -webkit-transition: .3s ease-out all;
  transition: .3s ease-out all;
}

.switch-button .active-case {
  color: #151515;
}

.signature {
  position: fixed;
  font-family: sans-serif;
  font-weight: 100;
  bottom: 10px;
  left: 0;
  letter-spacing: 4px;
  font-size: 10px;
  width: 100vw;
  text-align: center;
  color: #efefef;
  text-transform: uppercase;
  text-decoration: none;
}

#mydiv {
    position: absolute;
    z-index: 9;
    background-color: #f1f1f1;
    text-align: center;
    border: 1px solid #d3d3d3;
  }
  #mydivheader {
    padding: 10px;
    cursor: move;
    z-index: 10;
    background-color: #2196F3;
    color: #fff;
  }
</style>
`

export const chatTemp = document.createElement('template')

chatTemp.innerHTML = `

<div class="mydiv" id="mydiv">
    

    
<span id='close'>x</span>

<div class='overflow'>
  <div id='messages'></div>
</div>


<div id='input-area'>

  <textarea id='input' type='text' ></textarea>
  <button id='send'>Choose Name</button>
</div>

  

</div>

<style>
    
 * {
padding: 0;
margin: 0;
box-sizing: border-box;
}

body {
font-family: "Lato", sans-serif;
min-height: 100vh;
min-width: 100vw;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
background: #ffffff;
}

#name-input {
display: flex;
justify-content: center;
align-items: center;
}

#stream-chat {
margin: 10px;
min-width: 500px;
max-width: 600px;
width: 80%;
min-height: 500px;
max-height: 600px;
height: 80%;
display: flex;
flex-direction: column;
align-items: stretch;
}
#stream-chat h1 {
background: #2b2b2b;
color: #eeeeee;
text-align: center;
font-weight: 300;
padding: 1rem;
}

#input-area {
display: flex;
min-height: 175px;
flex-direction: column;
background: #1d1d1d;
padding: 15px;
}

#send {
align-self: flex-end;
padding: 8px 15px;
margin: 3px;
background: #632f9f;
border: none;
color: #f8ebec;
font-weight: 900;
display: flex;
justify-content: center;
align-items: center;
border-radius: 5px;
box-shadow: 0 0 10px 0px #4a2378;
}

#input {
flex-grow: 1;
border: 5px solid #282828;
flex-grow: 1;
background: #090909;
color: #919090;
margin-bottom: 0.7em;
resize: none;
}
#input:focus {
outline: none;
}

#messages {
min-height: 500px;
background: linear-gradient(to bottom, #2b2b2b, #1d1d1d);
flex-grow: 1;
display: flex;
flex-direction: column;
justify-content: flex-end;
padding-left: 12px;
}
#messages .even {
background: #171717;
}
#messages .odd {
background: #111111;
}
#messages .message {
padding: 3px 5px;
}
#messages .message .timestamp {
color: #626a6f;
margin-right: 0.1em;
}
#messages .message .name {
font-weight: 900;
}
#messages .message .text {
margin-left: 0.1em;
color: #bbb7ab;
}

.overflow {
overflow-y: scroll;
width: 250px;
height: 250px;
}

::-webkit-scrollbar {
width: 12px;
}

::-webkit-scrollbar-thumb {
border-radius: 10px;
background: #5e5e5e;
}

::-webkit-scrollbar,
::-webkit-scrollbar-button,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece,
::-webkit-scrollbar-corner,
::-webkit-resizer {
background: #2b2b2b;
}

.header {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: #f4f3f0;
min-height: 100px;
width: 100vw;
}
.header h1 {
color: #404040;
text-align: center;
}
.header p {
color: #555555;
}
#mydiv {
  position: absolute;
  z-index: 9;
  background-color: #f1f1f1;
  text-align: center;
  border: 1px solid #d3d3d3;
}
#description {
background: #404040;
color: #999999;
min-height: 100px;
width: 100vw;
display: flex;
justify-content: space-around;
align-items: center;
}
#description a {
color: #bfbfbf;
}
#description a:hover {
color: #f2f2f2;
}
#close {

  display: inline-block;
  padding: 2px 5px;

  position: relative;
  background: #ccc;
  left: 116px;
  cursor: pointer;
}
}
</style>

`
export const gameTemp = document.createElement('template')

gameTemp.innerHTML = `
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
<div class="mydiv" id="mydiv">

<div class="container">


    <section class="score-panel">
    
        <div class="current-rate">
       
            <div class="counter"></div>
            <span>Move(s) </span><span class="moves">0</span>
            <span id='close'>x</span>
        </div>
 
        <div class="counter">
            <span>Time 
            
            </span><span class="displayTime">00:00</span>
            <i class="fa fa-clock-o" aria-hidden="true"></i>

        </div>

        

    </section>

    <ul class="deck" id="card-deck">

       
    </ul>

  


</div>

</div>

<style>
    html {
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}

html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    color: #fff;
    text-align: center;
}

body {
    background: #ffffff url('https://images7.alphacoders.com/782/782527.jpg'); /* Background pattern from Subtle Patterns */
  background-repeat: no-repeat;
    background-size: cover;
    font-family: 'Coda', cursive;
    font-size: 1em; /16px/
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
}

/*
 * Styles for the deck of cards
 */

.deck {
  width: 34.5em;
    min-height:26.5em;
    background: linear-gradient(160deg, rgb(218 226 246 / 80%) 0%, rgb(87 196 239 / 50%) 100%);
    padding: 2em;  /32px/
    border-radius: 10px;
    box-shadow: 12px 15px 20px 0 rgba(46, 61, 73, 0.5);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 0 0 3em;
    left: 129px;
    position: relative;
}

.deck .card {
    height: 125px; /125px/
    width: auto;
    margin: 0.2rem 0.2rem;
    font-size: 0;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
}

.deck .card.open {
    transform: rotateY(0);
    background: #86a9e3; /#02b3e4/
    cursor: default;
    animation-name: flipInY;
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    animation-duration: .75s;
}

.deck .card.show {
    font-size: 33px;
}

.deck .card.match {
    cursor: default;
    background: #1bc45f;
    font-size: 33px;
    animation-name: rubberBand;
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    animation-duration: .75s;

}

.deck .card.unMatch {
    animation-name: pulse;
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    animation-duration: .75s;
    cursor: default;
    background: #ffb366;
    font-size: 33px;
}


.back {
    background: #2e3d49;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
    border: none;
    outline: none;
}

.check {
    transform: rotateY(180deg);
}

/modal section/

.pop-up {
    z-index: 1000;
    width: 100%;
    height: 100%;
    /position: fixed;/
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.hidden{

}

.result {
  position: absolute;
    top: 22.62em;
    left: 43.75em;
    width: 500px;
    max-width: 90vw;
    background-color: #b0cee8;
    box-shadow: 0 -1px 0 0.2em #646da8, 0 0.2em 0.2em 0 rgb(89, 167, 168);
    border-radius: 30px;
}
.fireworks {
    left: 0.5em;
    top: 5.5em;
}

.cup {
  right: 0.5em;
    top: 6.5em;
}

.fireworks, .cup {
    max-width: 100px;
    max-height: 100px;
    display: block;
    position: absolute;
}

input#btn-submit{
    height: 30px;
}


/footer section/

footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fff;
}
#close {
  float: right;
  display: inline-block;
  padding: 2px 5px;
  background: #ccc;
  right: 16px;
  top: 0px;
  position: absolute;
  cursor: pointer;
}
footer img {
    max-height: 1.5em;
    max-width: 1.5em;
}

footer .social {
    padding: 10px;
    background: linear-gradient(90deg, transparent, rgb(16, 107, 147), transparent);
    /background: linear-gradient(160deg, rgba(39,47,66,0.3) 0%, rgba(98,191,228,0.5) 100%);/
    border-radius: 15px;
}

.fa-star {
    color: #ffff99;
}

.hide {
    display: none;
}

.fa-heart {
    color: #ff6766;
}

.fa-coffee {
    color: #9af9ad;
}

/*
 * Styles for the Score Panel
 */

.score-panel {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.score-panel {
    text-align: left;
    width: 456px;
    margin-bottom: 10px;
    background-color: rgba(29, 109, 141, 0.5);
    border-radius: 25px;
    padding: 10px;
}
.score-panel {
  right: 128px;
  left: 127px;
  position: relative;
}

.score-panel .star-rating {
    margin: 0;
    padding: 0;
    display: inline-block;
    margin: 0 5px 0 0;
}

.score-panel .star-rating li {
    list-style: none;
    display: inline-block;
}

.score-panel .restart {
    float: right;
    cursor: pointer;
    color: #fff;
    background-color: rgba(173, 190, 225, 0.6);
    box-sizing: border-box;
    outline: none;

}

.timer {
    display: inline-block;
    margin: 0 1rem;
}

/.score-panel .moves {/
/color: #fff;/
/}/

.btn {
    width: 85px;
    height: 45px;
    border-radius: 40px;
    font-family: 'Maven Pro', sans-serif;
    font-weight: bold;
    color: white;
    background: rgba(29, 109, 141, 0.5);
    border: 1px solid rgb(29, 109, 141);
    box-sizing: border-box;
    outline: none;
    font-size: 0.83em;
}

.counter span {
    display: inline-block;
    width: 100%;
}

/* animations */
@keyframes flipInY {
    from {
        transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }

    40% {
        transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
        animation-timing-function: ease-in;
    }

    60% {
        transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
        opacity: 1;
    }

    80% {
        transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }

    to {
        transform: perspective(400px);
    }
}

@keyframes rubberBand {
    from {
        transform: scale3d(1, 1, 1);
    }

    30% {
        transform: scale3d(1.25, 0.75, 1);
    }

    40% {
        transform: scale3d(0.75, 1.25, 1);
    }

    50% {
        transform: scale3d(1.15, 0.85, 1);
    }

    65% {
        transform: scale3d(.95, 1.05, 1);
    }

    75% {
        transform: scale3d(1.05, .95, 1);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}

@keyframes pulse {
    from {
        transform: scale3d(1, 1, 1);
    }

    50% {
        transform: scale3d(1.2, 1.2, 1.2);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}
.deck {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.hide{
  padding: 10px;
  visibility: hidden;
}
.match, .showimg{
  visibility: visible !important;
}


.popup {
  border: 0px solid #ffffff;
  width: 350px;
  height: 500px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  box-shadow: 0px 3px 6px 2px rgba(144, 144, 242, 1.5);
}
#mydiv {
  position: absolute;
  z-index: 9;

}
.first-block {
  background-color: #1E52F7;
  border: 0px solid #ffffff;
  width: 350;
  height: 250px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px 5px 0px 0px;
}

/* X Close Button */
.close {
  position: relative;
  right: -37%;
  top: 10px;
  width: 32px;
  height: 32px;
  opacity: 0.2;
}

.close:hover {
  opacity: 1;
}

.close::before, .close::after {
  position: absolute;
  left: 15px;
  content: "";
  height: 32px;
  width: 2px;
  background-color: #333;
}

.close::before {
  transform: rotate(45deg);
}

.close::after {
  transform: rotate(-45deg);
}
/*End of X Close Button */

.fa-check-circle {
  color: #ffffff;
  margin-top: 65px;
  font-size: 120px;
}

h3 {
  color: #687C99;
  font-size: 24px;
  margin-top: 30px;
}

h3 + p {
  color: #95A3B0;
}

button[name="share"] {
  color: #001867;
  border: 0px solid #ffffff;
  width: 170px;
  border-radius: 20px;
  font-size: 16px;
  height: auto;
  padding: 10px;
  box-shadow: 0px 7px 35px 0px  rgba(167, 186, 244, 0.7);
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
}

button[name="share"]:hover {
  background-color: #1E52F7;
  color: #ffffff;
}
.showimg{
  width: inherit;
  height: inherit;
}
.focus{
  background-color:yellow
}
</style>
`
