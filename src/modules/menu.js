const toggeMenu = () => {

  const menu = document.querySelector('menu')

  const ToggleMenu = () => {
    menu.classList.toggle('active-menu')
  }

  const smoothScrollMenu = e => {
    const target = e.target
    e.preventDefault()
    const linkId = target.getAttribute('href')

    document.querySelector(linkId).scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  document.body.addEventListener('click', e => {
    let target = e.target

    if (target.tagName === 'A' && target.closest('li')) {
      smoothScrollMenu(e)
    }

    if (target.closest('.menu')) {
      ToggleMenu()
    } else if (target.closest('.active-menu') && !target.classList.contains('active-menu')) {
      ToggleMenu()
    } else {
      target = target.closest('.active-menu')
      if (menu.classList.contains('active-menu') && !target) {
        ToggleMenu()
      }
    }
  })
}

export default toggeMenu