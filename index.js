/* -----------------------------------------
  Have focus outline only for keyboard users
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }
}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

/* -----------------------------------------
  Back to top button
 ---------------------------------------- */

const backToTopButton = document.querySelector('.back-to-top')

window.addEventListener('scroll', () => {
  backToTopButton.classList.toggle('is-visible', window.scrollY > 700)
})

/* -----------------------------------------
  Mobile navigation
 ---------------------------------------- */

const navToggle = document.getElementById('navToggle')
const navMenu = document.getElementById('navMenu')

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open')
    navToggle.setAttribute('aria-expanded', isOpen)
  })

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open')
      navToggle.setAttribute('aria-expanded', 'false')
    })
  })
}

/* -----------------------------------------
  Reveal on scroll
 ---------------------------------------- */

const revealItems = document.querySelectorAll('.reveal')

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  revealItems.forEach((item) => revealObserver.observe(item))
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'))
}

/* -----------------------------------------
  Skill bars
 ---------------------------------------- */

const skillItems = document.querySelectorAll('.skill')

if ('IntersectionObserver' in window) {
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.4 })

  skillItems.forEach((item) => skillObserver.observe(item))
} else {
  skillItems.forEach((item) => item.classList.add('is-visible'))
}

/* -----------------------------------------
  Typing effect (width matches the actual text)
 ---------------------------------------- */

const typingEl = document.getElementById('typingText')

if (typingEl) {
  const charCount = typingEl.textContent.length
  typingEl.style.setProperty('--char-count', `${charCount}ch`)
  typingEl.style.setProperty('--type-duration', `${Math.max(charCount * 0.05, 1.5)}s`)
  typingEl.classList.add('is-typing')

  typingEl.addEventListener('animationend', () => {
    typingEl.classList.remove('is-typing')
    typingEl.classList.add('is-done')
  })
}
