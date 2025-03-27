import { expect } from 'chai'
import Router from './Router.ts'
import { Block } from './Block.ts'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'

class MockBlock extends Block {
  render(): string {
    return '<div>Mock Content</div>'
  }
}

describe('Router', () => {
  let router: Router
  let dom: JSDOM

  beforeEach(() => {
    dom = new JSDOM('<div id="app"></div>', { url: 'http://localhost' })
    global.window = dom.window as unknown as Window & typeof globalThis
    global.document = dom.window.document

    router = new Router('#app')

    router.use('/', () => new MockBlock({}))
    router.use('/sign-up', () => new MockBlock({}))
    router.use('/404', () => new MockBlock({}))

    router.start()
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should initialize correctly', () => {
    expect(router).to.be.an.instanceof(Router)
  })

  it('should navigate to a new page correctly', () => {
    router.go('/sign-up')
    expect(window.location.pathname).to.eq('/sign-up')
  })

  it('should redirect to 404 for unknown routes', async () => {
    router.go('/400')
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(window.location.pathname).to.be.oneOf(['/', '/404'])
  })

  it('should handle back navigation correctly', async () => {
    router.go('/sign-up')
    await new Promise((resolve) => setTimeout(resolve, 50))

    router.back()
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(window.location.pathname).to.eq('/')
  })

  it('should handle forward navigation correctly', async () => {
    router.go('/sign-up')
    await new Promise((resolve) => setTimeout(resolve, 50))

    router.back()
    await new Promise((resolve) => setTimeout(resolve, 50))

    router.forward()
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(window.location.pathname).to.eq('/sign-up')
  })

  it('should render content correctly', async () => {
    router.go('/sign-up')
    await new Promise((resolve) => setTimeout(resolve, 50))

    const appElement = document.querySelector('#app')
    expect(appElement).to.exist
    expect(appElement?.innerHTML).to.include('Mock Content')
  })
})
