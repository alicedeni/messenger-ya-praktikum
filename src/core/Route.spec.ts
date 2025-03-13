import { expect } from 'chai'
import Route from './Route.ts'
import { Block } from './Block.ts'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'

class MockBlock extends Block {
  render(): string {
    const element = document.createElement('div')
    element.innerHTML = 'Mock Block'
    return element.outerHTML
  }
}

describe('Route', () => {
  let route: Route
  let dom: JSDOM

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><div id="app"></div>')
    global.document = dom.window.document
    global.window = dom.window as any

    route = new Route('/page', () => new MockBlock({}), '#app')
  })

  it('should initialize correctly', () => {
    expect(route).to.be.an.instanceof(Route)
  })

  it('should match route with the same pathname', () => {
    expect(route.match('/page')).to.be.true
    expect(route.match('/other')).to.be.false
  })

  it('should navigate correctly and render the block', () => {
    const renderSpy = sinon.spy(route, 'render')

    route.navigate('/page')
    expect(renderSpy.calledOnce).to.be.true

    const appElement = document.querySelector('#app')
    expect(appElement).to.exist
    expect(appElement?.innerHTML).to.include('Mock Block')
  })

  it('should leave route correctly', () => {
    const block = new MockBlock({})
    route['_block'] = block
    const hideSpy = sinon.spy(block, 'hide')

    route.leave()
    expect(hideSpy.calledOnce).to.be.true

    const blockElement = block.getContent()
    expect(blockElement.style.display).to.equal('none')
  })

  it('should not navigate if pathname does not match', () => {
    const renderSpy = sinon.spy(route, 'render')

    route.navigate('/other')
    expect(renderSpy.notCalled).to.be.true
  })
})
