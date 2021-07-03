const toggleTeam = () => {
  const imgsTeam = document.querySelectorAll('.command__photo')
  const command = document.getElementById('command')
  const imgsSrcArr = []

  imgsTeam.forEach(el => {
    const ourSrcAttr = el.getAttribute('src')
    imgsSrcArr.push(ourSrcAttr)
  })

  const takenSrcAttr = imgsSrcArr.toString().split(',')

  imgsTeam.forEach(el => {
    el.addEventListener('mouseover', e => {
      if (e.target.classList.contains('command__photo')) {
        e.target.src = e.target.dataset.img
      }
    })
  })
  command.addEventListener('mouseout', event => {
    const target = event.target
    if (target.classList.contains('command__photo')) {
      for (let i = 0; i < imgsTeam.length; i++) {
        imgsTeam[i].setAttribute('src', takenSrcAttr[i]);
      }
    }
  })
}

export default toggleTeam