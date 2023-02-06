const rules = document.querySelector('.rules')
const rulesHideBtn = document.querySelector('.rules-hidden .background img')
const rulesHidden = document.querySelector('.rules-hidden')
const content = document.querySelector('.content')
const score =document.querySelector('.score-container .score')

var audio = new Audio('sound/sound.wav')

rules.addEventListener('click', () => {
 rulesHidden.classList.toggle('none')
 if(window.innerWidth < 450) {
  rules.style.display = 'none'
 }
})
rulesHideBtn.addEventListener('click', () => {
 rulesHidden.classList.add('none')
 rules.style.display  = 'block'
})
window.addEventListener('click', (e) => {
  if(e.target === rulesHidden) {
    rulesHidden.classList.add('none')
  }
})

const userPicked = document.querySelector('[data-user-picked]')
const housePicked = document.querySelector('[data-house-picked]')
const contentPicked = document.querySelector('.content-picked')

const chooseBtn = document.querySelectorAll('[data-game]')

let housePickedEl;

const getHousePicked = () => {
  return new Promise((resolve, reject) => {
    let rand
    let interval = setInterval(() => {
      rand = Math.floor(Math.random() * 3)
      housePicked.innerHTML = chooseBtn[rand].outerHTML
    }, 100)
    audio.play()
    
    const timeout = Math.floor(Math.random() * 3000 + 1000)
    setTimeout(() => {
      audio.pause()
      audio.currentTime = 0
      clearInterval(interval)
      if (rand === undefined) {
        reject(new Error('rand is undefined'))
        //not happening because rand is always 1+second
      } else {
        resolve(chooseBtn[rand].classList)
      }
    }, timeout)
  })
}

let currentScore = 0

const result = document.querySelector('.result')
const resultP = document.querySelector('.result p')

chooseBtn.forEach(choose => {
  choose.addEventListener('click', async () => {
    chooseBtn.forEach(anotherChoose => {
      anotherChoose.classList.remove('scissors-position','rock-position', 'paper-position')
    })
    content.classList.add('none')
    contentPicked.style.display = 'flex'
    userPicked.innerHTML = choose.outerHTML

    let first = choose.classList.value
    
    housePickedEl = await getHousePicked()
    
    if (first === housePickedEl.value) {
      result.style.display = 'flex'
      resultP.textContent = 'DRAW'
    }
    else if((first === 'paper' && housePickedEl.value === 'scissors') || (first === 'scissors' && housePickedEl.value === 'rock') || (first === 'rock' && housePickedEl.value === 'paper')) {
      result.style.display = 'flex'
      resultP.textContent = 'YOU LOSE'
      if(currentScore !== 0) {
        currentScore--
        score.textContent = currentScore
      }
    }
    else if((first === 'paper' && housePickedEl.value === 'rock') || (first === 'scissors' && housePickedEl.value === 'paper') || (first === 'rock' && housePickedEl.value === 'scissors')) {
      result.style.display = 'flex'
      resultP.textContent = 'YOU WIN'
      currentScore++
      score.textContent = currentScore
    }
  })
})

const resultBtn = document.querySelector('.result button')

resultBtn.addEventListener('click', () => {
  startAgain()
})

function startAgain() {
  result.style.display = 'none'
  contentPicked.style.display = 'none'
  content.classList.remove('none')
  chooseBtn[0].classList.add('paper-position')
  chooseBtn[1].classList.add('scissors-position')
  chooseBtn[2].classList.add('rock-position')
}
