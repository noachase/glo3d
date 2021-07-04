const sendForm = () => {
  const errorMessage = `it's broke`
  const successMessage = `Thanks, will get in touch soon!`
  const spinner = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <g>
    <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#ffffff" stroke-width="15"></path>
    <path d="M49 3L49 27L61 15L49 3" fill="#ffffff"></path>
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.2987012987012987s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
  </g>
  </svg>`;

  const forms = document.querySelectorAll('form')
  const statusMessage = document.createElement('div')
  const inputs = document.body.querySelectorAll('input')

  statusMessage.style.cssText = `
		font-size: 2rem;
		color: tomato;
	`

  const postData = body => {
    statusMessage.innerHTML = spinner
    console.log('hi')
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
  }

  function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }


  const formSend = currentForm => {

    currentForm.addEventListener('input', e => {
      const target = e.target
      e.preventDefault()
      currentForm.appendChild(statusMessage)

      const checkPhone = /(\+|\d){1}(\d){10}(?![A-Za-zА-Яа-яЁё])/
      // const checkPhone = /(\+|\d){1}(\d){12,16}(?![A-Za-zА-Яа-яЁё])/
      const checkName = /([А-Яа-яЁё]){2,}/g
      const checkMessage = /(\s){0,}([А-Яа-яЁё]){1,}/g
      const checkEmail = /^\w+@\w+\.\w{2,}$/

      const inputsPhone = currentForm.querySelector('input[name="user_phone"]')
      const inputsName = currentForm.querySelector('input[name="user_name"]')
      const inputsMessage = currentForm.querySelector('input[name="user_message"]')
      const inputsMail = currentForm.querySelector('input[name="user_email"]')
      const formBtn = document.querySelectorAll('.form-btn')

      const bgWarnColor = 'tomato'

      const btnEnable = () => {
        formBtn.forEach(el => {
          el.removeAttribute('disabled')
        })
      }
      const btnDisable = () => {
        formBtn.forEach(el => {
          el.setAttribute('disabled', true)
        })
      }

      if (target.contains(inputsName) && !checkName.test(inputsName.value)) {
        btnDisable()
        inputsName.style.backgroundColor = bgWarnColor
        statusMessage.textContent = `only cyrylic allowed`
        return
      } else {
        btnEnable()
        statusMessage.textContent = ''
        inputsName.style.backgroundColor = 'white'
      }

      if (target.contains(inputsPhone) && !inputsPhone.value.match(checkPhone) || inputsPhone.value.length > 17) {
        btnDisable()
        inputsPhone.style.backgroundColor = bgWarnColor
        statusMessage.textContent = `only numbers allowed`
        return
      } else {
        inputsPhone.value = inputsPhone.value.replace(/[a-zа-яё]/i, '')
        btnEnable()
        statusMessage.textContent = ''
        inputsPhone.style.backgroundColor = 'white'
      }

      if (target.contains(inputsMail) && !inputsMail.value.match(checkEmail)) {
        btnDisable()
        inputsMail.style.backgroundColor = bgWarnColor
        statusMessage.textContent = `xxx@yyy.zzz`
        return
      } else {
        inputsMail.value = inputsMail.value.replace(/[а-яё]\s/i, '')
        btnEnable()
        statusMessage.textContent = ''
        inputsMail.style.backgroundColor = 'white'
      }

      if (target.contains(inputsMessage) && !checkMessage.test(inputsMessage.value)) {
        btnDisable()
        inputsMessage.style.backgroundColor = bgWarnColor
        statusMessage.textContent = `only russian allowed`
        return
      } else if (target.contains(inputsMessage)) {
        btnEnable()
        statusMessage.textContent = ''
        inputsMessage.style.backgroundColor = 'white'
      }
    })

    currentForm.addEventListener('submit', e => {
      e.preventDefault()

      currentForm.appendChild(statusMessage)
      const formData = new FormData(currentForm)
      let body = {}

      formData.forEach((val, key) => {
        body[key] = val
      })

      postData(body)
        .then(res => {
          if (res.status !== 200) {
            throw new Error(`response status isn't 200!`)
          }
          return res
        })
        .then(
          statusMessage.innerHTML = spinner
        )
        .then(() => {
          statusMessage.textContent = successMessage

          body = {}
          inputs.forEach(el => {
            el.value = ''
          })
        })
        .catch(err => {
          statusMessage.textContent = errorMessage
          console.error(err)
        })

      delay(5000).then(() => {
        statusMessage.innerHTML = ''
      })
    })

  }
  forms.forEach(el => formSend(el))
}

export default sendForm