import Route from './Route'
import { Block } from './Block'
import { AuthService } from '../services/authService'

const authService = new AuthService()

class Router {
  private static __instance: Router
  private routes: Route[] = []
  private history: History = window.history
  private _currentRoute: Route | null = null
  private _rootQuery: string = ''
  private _protectedRoutes: string[] = ['/messenger', '/settings']

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  public use(pathname: string, block: () => Block): Router {
    const route = new Route(pathname, block, this._rootQuery)
    this.routes.push(route)
    return this
  }

  public start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  private async _onRoute(pathname: string): Promise<void> {
    if (this._protectedRoutes.includes(pathname)) {
      const isAuthenticated = await this._checkAuth()
      if (!isAuthenticated) {
        this.go('/')
        return
      }
    }

    const route = this.getRoute(pathname)

    if (!route) {
      this.go('/404')
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  private async _checkAuth(): Promise<boolean> {
    try {
      await authService.getUser()
      return true
    } catch (error) {
      console.error('Authentication check failed:', error)
      return false
    }
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back(): void {
    this.history.back()
  }

  public forward(): void {
    this.history.forward()
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname))
  }
}

export default new Router('#app')
