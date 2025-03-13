import Route from './Route.ts'
import { Block } from './Block.ts'
import { AuthService } from '../services/authService.ts'

const authService = new AuthService()

class Router {
  private static __instance: Router
  private routes: Route[] = []
  private history: string[] = []
  private _currentRoute: Route | null = null
  private _rootQuery: string = ''
  private _protectedRoutes: string[] = ['/messenger', '/settings']

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
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
    this.history.push(pathname)
    window.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back(): void {
    if (this.history.length > 1) {
      this.history.pop()
      const previousPath = this.history[this.history.length - 1]
      window.history.back()
      this._onRoute(previousPath)
    }
  }

  public forward(): void {
    const nextPath = window.location.pathname
    window.history.forward()
    this._onRoute(nextPath)
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname))
  }
}

export default Router
