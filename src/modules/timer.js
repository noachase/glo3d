const countTimer = deadline => {
  const timerHours = document.querySelector('#timer-hours')
  const timerMinutes = document.querySelector('#timer-minutes')
  const timerSeconds = document.querySelector('#timer-seconds')

  const getTimeRamaining = () => {
    const dateStop = new Date(deadline).getTime()
    const dateNow = new Date().getTime()
    const timeRemaining = (dateStop - dateNow) / 1000

    const seconds = Math.floor(timeRemaining % 60)
    const minutes = Math.floor(timeRemaining / 60) % 60
    const hours = Math.floor(timeRemaining / 60 / 60)

    return {
      hours,
      minutes,
      seconds,
      timeRemaining
    }
  }

  const updateClock = () => {
    const timer = getTimeRamaining()

    timerHours.textContent = timer.hours
    timerMinutes.textContent = timer.minutes
    timerSeconds.textContent = timer.seconds

    if (timer.hours < 10) {
      timerHours.textContent = '0' + timer.hours
    }
    if (timer.minutes < 10) {
      timerMinutes.textContent = '0' + timer.minutes
    }
    if (timer.seconds < 10) {
      timerSeconds.textContent = '0' + timer.seconds
    }
  }

  if (getTimeRamaining().timeRemaining > 0) {
    updateClock()
    setInterval(updateClock, 1000)
  } else if (getTimeRamaining().timeRemaining < 0) {
    const zeros = '00'
    timerHours.textContent = zeros
    timerMinutes.textContent = zeros
    timerSeconds.textContent = zeros
  }
}

export default countTimer