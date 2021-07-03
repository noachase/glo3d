const calculator = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block')
  const calcType = document.querySelector('.calc-type')
  const calcSquare = document.querySelector('.calc-square')
  const calcDay = document.querySelector('.calc-day')
  const calcCount = document.querySelector('.calc-count')
  const totalValue = document.getElementById('total')

  const countSum = () => {
    let total = 0
    let countValue = 1
    let dayValue = 1
    const typeValue = calcType.options[calcType.selectedIndex].value
    const squareValue = +calcSquare.value

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue
    }

    totalValue.textContent = total

    const animateValue = (id, start, end, duration) => {

      const obj = document.getElementById(id)
      const range = end - start
      const minTimer = 100
      let stepTime = Math.abs(Math.floor(duration / range))

      stepTime = Math.max(stepTime, minTimer)

      const startTime = new Date().getTime()
      const endTime = startTime + duration
      let timer

      const run = () => {
        const now = new Date().getTime()
        const remaining = Math.max((endTime - now) / duration, 0)
        const value = Math.round(end - (remaining * range))
        obj.textContent = Math.ceil(value)
        if (value === end) {
          clearInterval(timer)
        }
      }
      timer = setInterval(run, stepTime)
      run()
    }
    animateValue("total", 0, total, 1000)
  }

  calcBlock.addEventListener('change', e => {
    const target = e.target
    if (target.matches('select') || target.matches('input')) {
      countSum()
    }
  })
}

export default calculator