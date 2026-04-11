export const toggleTheme = () => {
  const root = document.documentElement
  const current = root.getAttribute('data-theme') || 'light'
  const next = current === 'light' ? 'dark' : 'light'

  localStorage.setItem('theme', next)
  root.setAttribute('data-theme', next)
}
