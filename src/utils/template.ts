export function compileTemplate(template: string, context: Record<string, unknown>): HTMLElement {
  template = template.replace(
    /\{\{#if (.*?)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_, condition, content) => {
      const value = context[condition.trim()]
      if (value) {
        return content.replace(/\{\{else\}\}[\s\S]*/, '').trim()
      } else {
        const elseContentMatch = content.match(/\{\{else\}\}([\s\S]*)/)
        return elseContentMatch ? elseContentMatch[1].trim() : ''
      }
    },
  )

  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = template.replace(/\{\{\{(.*?)\}\}\}/g, (_, key) => {
    const value = context[key.trim()]
    if (value instanceof HTMLElement) {
      return `<div data-placeholder="${key.trim()}"></div>`
    }
    return value !== undefined ? String(value) : ''
  })

  Object.keys(context).forEach((key) => {
    const placeholder = tempDiv.querySelector(`[data-placeholder="${key}"]`)
    if (placeholder && context[key] instanceof HTMLElement) {
      placeholder.replaceWith(context[key] as HTMLElement)
    }
  })

  return tempDiv.firstElementChild as HTMLElement
}
