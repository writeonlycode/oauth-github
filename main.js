import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

function github_access_token() {
  http://localhost:5174/?code=83552ab21a579eeabcd0
}

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
