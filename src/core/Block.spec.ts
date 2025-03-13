import { expect } from 'chai'
import { Block } from './Block.ts'

class TestBlock extends Block {
  render(): string {
    return '<div class="test-block">Test Content</div>'
  }
}

describe('Block', () => {
  let block: TestBlock

  beforeEach(() => {
    block = new TestBlock({})
  })

  it('should update props and trigger render', () => {
    let renderCalled = false

    block.render = () => {
      renderCalled = true
      return '<div>New Content</div>'
    }

    block.setProps({ newProp: 'value' })
    expect(renderCalled).to.be.true
  })

  it('should return correct HTML on render', () => {
    const html = block.render()
    expect(html).to.equal('<div class="test-block">Test Content</div>')
  })
})
