import './style.css'
import { router } from './router'

window.addEventListener('load', router)
window.addEventListener('popstate', router)
