const togglePopup = () => {
  const popup = document.querySelector('.popup')
  let count = 0
  let movePopUp
  let width = document.documentElement.clientWidth

  const move = () => {
    movePopUp = requestAnimationFrame(move)
    count += 10
    count++
    if (count < 200) {
      popup.firstElementChild.style.top = count + 'px'
    } else {
      cancelAnimationFrame(movePopUp)
    }
  }

  const resetAnim = () => {
    count = 0
    popup.firstElementChild.style.top = -350 + 'px'
    popup.style.display = 'none'
  }

  document.body.addEventListener('click', event => {
    let target = event.target
    width = document.documentElement.clientWidth

    if (target.classList.contains('popup-btn')) {
      popup.style.display = 'block'
      if (width > 768) {
        movePopUp = requestAnimationFrame(move)
      } else if (width < 768) {
        cancelAnimationFrame(movePopUp)
        popup.firstElementChild.style.top = 200 + 'px'
      }
    } else if (target.classList.contains('popup-close')) {
      resetAnim()
    } else {
      target = target.closest('.popup-content')
      if (!target) {
        resetAnim()
      }
    }
  })
}

export default togglePopup