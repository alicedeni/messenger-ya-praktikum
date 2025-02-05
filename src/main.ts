import './style.css'
import { router } from './router'

function initRouter(): void {
  window.addEventListener('load', router)
  window.addEventListener('popstate', router)
}

initRouter()
