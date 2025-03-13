import { expect } from 'chai'
import { compileTemplate } from './template.ts'
import { JSDOM } from 'jsdom'

describe('compileTemplate', () => {
  let dom: JSDOM

  before(() => {
    dom = new JSDOM('<!DOCTYPE html><div id="app"></div>', { url: 'http://localhost' })
    global.document = dom.window.document
    global.window = dom.window as any
    global.HTMLElement = dom.window.HTMLElement
  })

  it('должен корректно обрабатывать условные операторы if/else', () => {
    const template = `
      {{#if isLoggedIn}}
        <p>Welcome back!</p>
      {{else}}
        <p>Please log in.</p>
      {{/if}}
    `

    const contextTrue = { isLoggedIn: true }
    const contextFalse = { isLoggedIn: false }

    const resultTrue = compileTemplate(template, contextTrue)
    const resultFalse = compileTemplate(template, contextFalse)

    expect(resultTrue.innerHTML).to.include('Welcome back!')
    expect(resultFalse.innerHTML).to.include('Please log in.')
  })

  it('должен заменять плейсхолдеры на HTML-элементы', () => {
    const template = `<div>{{{customElement}}}</div>`

    const customElement = document.createElement('div')
    customElement.innerHTML = 'Custom Element'

    const context = {
      customElement,
    }

    const result = compileTemplate(template, context)

    expect(result.innerHTML).to.include('Custom Element')
  })

  it('должен игнорировать несуществующие ключи в контексте', () => {
    const template = `<div>{{{customElement}}}</div>`

    const context = {}

    const result = compileTemplate(template, context)

    expect(result.innerHTML).to.equal('')
  })
})
