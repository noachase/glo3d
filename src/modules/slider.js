const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item')
  const dotParent = document.querySelector('.portfolio-dots')
  //!PAINT DOTS
  slide.forEach(item => {
    item = document.createElement('li')
    item.classList.add('dot')
    dotParent.appendChild(item)
  })
  //*PAINT DOTS END
  const dot = document.querySelectorAll('.dot')
  const slider = document.querySelector('.portfolio-content')

  let currentSlide = 0
  let interval

  const prevSlide = (el, i, strClass) => {
    el[i].classList.remove(strClass)
  }

  const nextSlide = (el, i, strClass) => {
    el[i].classList.add(strClass)
  }

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, 'portfolio-item-active')
    prevSlide(dot, currentSlide, 'dot-active')
    currentSlide++
    if (currentSlide >= slide.length) {
      currentSlide = 0
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active')
    nextSlide(dot, currentSlide, 'dot-active')
  }

  const startSlide = (delay = 3000) => {
    interval = setInterval(autoPlaySlide, delay)
  }

  const stopSlide = () => {
    clearInterval(interval)
  }


  slider.addEventListener('mouseover', e => {
    if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
      stopSlide()
    }
  })

  slider.addEventListener('mouseout', e => {
    if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
      startSlide()
    }
  })

  startSlide()

  slider.addEventListener('click', e => {
    e.preventDefault()
    const target = e.target

    if (!target.matches('.portfolio-btn, .dot')) {
      return
    }

    prevSlide(slide, currentSlide, 'portfolio-item-active')
    prevSlide(dot, currentSlide, 'dot-active')

    if (target.matches('#arrow-right')) {
      currentSlide++
    } else if (target.matches('#arrow-left')) {
      currentSlide--
    } else if (target.matches('.dot')) {
      dot.forEach((el, i) => {
        if (el === target) {
          currentSlide = i
        }
      })
    }
    if (currentSlide >= slide.length) {
      currentSlide = 0
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active')
    nextSlide(dot, currentSlide, 'dot-active')
  })

  //*SCROLL DOWN BUTTON
  const mainHeader = document.querySelector('main')
  const headerLinkScrollDown = mainHeader.lastElementChild
  const handleScrollDown = e => {
    e.preventDefault()
    const getId = headerLinkScrollDown.getAttribute('href')

    document.querySelector(getId).scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
  headerLinkScrollDown.addEventListener('click', handleScrollDown)

}

export default slider