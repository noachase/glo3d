const useValidation = () => {
  const calcInputs = document.querySelectorAll('.calc-item')
  const emailsInputs = document.querySelectorAll('input[type=email]')
  const cellInputs = document.querySelectorAll('input[type=tel]')
  const messageInput = document.querySelectorAll('.mess')
  const calcItems = document.querySelectorAll('input.calc-item')
  const form1Name = document.getElementById('form1-name')
  const form2Name = document.getElementById('form2-name')
  const form3Name = document.getElementById('form3-name')
  const form1Email = document.getElementById('form1-email')
  const form2Email = document.getElementById('form2-email')
  const form3Email = document.getElementById('form3-email')
  const form1Phone = document.getElementById('form1-phone')
  const form2Phone = document.getElementById('form2-phone')
  const form3Phone = document.getElementById('form3-phone')
  const form2Message = document.getElementById('form2-message')

  const digitsRegex = /\D/
  const textRegex = /[^а-я-' ё]/gi
  const messRegex = /([^а-я0-9-,.' ё])/gi
  // const mailRegex = /[^a-z-' @\-_.!~*']/gi
  const mailRegex = /[^a-z0-9-' @\.']/gi
  const cellRegex = /[^0-9+]/g

  const validateCalc = e => {
    const target = e.target
    target.value = target.value.replace(digitsRegex, '')
  }

  const validateText = e => {
    if (e.target.type === 'text' && !e.target.classList.contains('mess') && !e.target.classList.contains('calc-item')) {
      e.target.value = e.target.value
        .replace(textRegex, '')
    }
  }

  const validateMessageText = e => {
    if (e.target.type === 'text' && e.target.classList.contains('mess') && !e.target.classList.contains('calc-item')) {
      e.target.value = e.target.value
        .replace(messRegex, '')
    }
  }

  const validateEmail = e => {
    e.target.value = e.target.value
      .replace(mailRegex, '')
      .replace(/\s+/g, ' ')
  }

  const validateCell = e => {
    e.target.value = e.target.value
      .replace(cellRegex, '')
  }

  const validateFormMessageBlur = e => {
    e.target.value = e.target.value
      .replace(messRegex, '')
      .replace(/^[ -]+/g, '')
  }

  const validateFormNameBlur = e => {
    e.target.value = e.target.value
      .replace(/[^а-яё -]/gi, '')
      .replace(/^[ -]+/g, '')
      .replace(/[ -]+$/g, '')
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(word => {
        if (word === '') {
          return word
        }
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(' ')
  };

  const validateFormEmailBlur = e => {
    e.target.value = e.target.value
      .replace(mailRegex, '')
      .replace(/\s+/g, ' ')
  };

  const validateFormPhoneBlur = e => {
    e.target.value = e.target.value
      .replace(/[^()\-0-9]/g, '')
      .replace(/^[ -]+/g, '')
      .replace(/[ -]+$/g, '')
      .replace(/\s+/g, ' ')
  };

  calcItems.forEach(calcItem => {
    calcItem.addEventListener('blur', validateCalc);
  });

  emailsInputs.forEach(el => {
    el.addEventListener('input', validateEmail)
  })

  cellInputs.forEach(el => {
    el.addEventListener('input', validateCell)
  })

  document.body.addEventListener('input', validateText)

  messageInput.forEach(el => {
    el.addEventListener('input', validateMessageText)
  })

  calcInputs.forEach(el => {
    if (!el.classList.contains('calc-type')) {
      el.addEventListener('input', validateCalc)
    }
  })

  form1Name.addEventListener('blur', validateFormNameBlur)
  form2Name.addEventListener('blur', validateFormNameBlur)
  form3Name.addEventListener('blur', validateFormNameBlur)
  form1Email.addEventListener('blur', validateFormEmailBlur)
  form2Email.addEventListener('blur', validateFormEmailBlur)
  form3Email.addEventListener('blur', validateFormEmailBlur)
  form1Phone.addEventListener('blur', validateFormPhoneBlur)
  form2Phone.addEventListener('blur', validateFormPhoneBlur)
  form3Phone.addEventListener('blur', validateFormPhoneBlur)
  form2Message.addEventListener('blur', validateFormMessageBlur)
}

export default useValidation