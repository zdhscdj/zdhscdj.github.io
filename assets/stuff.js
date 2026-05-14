// ===========================
// Random Emoji
// ===========================
const emoji = ['☁️', '🆗', '👩🏻‍💻', '🎮', '🌵', '🌿', '📬', '⚡', '🚀', '🔥', '💡']
const randomEmoji = document.querySelector('.js-random-emoji')

if (randomEmoji) {
  randomEmoji.textContent = emoji[Math.floor(Math.random() * emoji.length)]
}

// ===========================
// Dark Mode
// ===========================
const darkModeCheckbox = document.querySelector('#dark-mode')
const supportsLocalStorage = 'localStorage' in window

if (darkModeCheckbox && supportsLocalStorage) {
  // Load saved preference or detect OS preference
  const savedMode = localStorage.getItem('darkMode')
  const osDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedMode !== null) {
    darkModeCheckbox.checked = savedMode === '1'
  } else if (osDarkMode) {
    darkModeCheckbox.checked = true
  }

  // Save preference on change
  darkModeCheckbox.addEventListener('change', () => {
    localStorage.setItem('darkMode', darkModeCheckbox.checked ? '1' : '0')
  })

  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
      darkModeCheckbox.checked = e.matches
    }
  })
}

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el)
})

// ===========================
// Smooth scroll for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

// ===========================
// Keyboard accessibility
// ===========================
let nextIntent = 'mousedown'

document.body.classList.add('has-js')

document.addEventListener('mousedown', () => { nextIntent = 'mousedown'; setIntent() })
document.addEventListener('keydown', () => { nextIntent = 'keydown'; setIntent() })

function setIntent() {
  document.body.classList.toggle('mousedown', nextIntent === 'mousedown')
  document.body.classList.toggle('keydown', nextIntent === 'keydown')
}

// ===========================
// Nav scroll effect
// ===========================
const nav = document.querySelector('.nav')
let lastScroll = 0

if (nav) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset
    if (currentScroll > 60) {
      nav.classList.add('nav-scrolled')
    } else {
      nav.classList.remove('nav-scrolled')
    }
    lastScroll = currentScroll
  }, { passive: true })
}
