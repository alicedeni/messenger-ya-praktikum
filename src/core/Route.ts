import { Block } from './Block.ts'

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs
}

class Route {
  constructor(
    private pathname: string,
    private view: () => Block,
    private rootQuery: string,
  ) {}

  public navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname
      this.render()
    }
  }

  public leave(): void {
    this._block?.hide()
  }

  public match(pathname: string): boolean {
    return isEqual(pathname, this.pathname)
  }

  public render(): void {
    if (this._block) {
      this._block.hide()
    }

    this._block = this.view()
    const root = document.querySelector(this.rootQuery)

    if (root) {
      root.innerHTML = ''
      root.appendChild(this._block.getContent())
    }
  }

  private _block: Block | null = null
}

export default Route
