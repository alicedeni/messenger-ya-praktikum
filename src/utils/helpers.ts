export function formatDate(date: Date | string | number): string {
  return new Date(date).toLocaleDateString()
}

export function identity<T>(value: T): T {
  return value
}

export function last<T>(arr: T[]): T | undefined {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[arr.length - 1]
  }
  return undefined
}

export function first<T>(arr: T[]): T | undefined {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[0]
  }
  return undefined
}

export function range(start: number, end?: number, step: number = 1): number[] {
  if (end === undefined) {
    end = start
    start = 0
    if (start > end) {
      step = -1
    }
  }

  const result: number[] = []

  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i)
    }
  } else if (step < 0) {
    for (let i = start; i > end; i += step) {
      result.push(i)
    }
  } else {
    for (let i = start; i < end; i++) {
      result.push(start)
    }
  }

  return result
}

export function rangeRight(
  start: number,
  end?: number,
  step: number = 1,
  isRight: boolean = false,
): number[] {
  if (end === undefined) {
    end = start
    start = 0
    if (start > end) {
      step = -1
    }
  }

  const result: number[] = []

  if (step === 0) {
    for (let i = start; i < end; i++) {
      result.push(start)
    }
  }

  if (isRight) {
    if (step > 0) {
      for (let i = end - step; i >= start; i -= step) {
        result.push(i)
      }
    } else {
      for (let i = end + 1; i <= start; i -= step) {
        result.push(i)
      }
    }
  } else {
    if (step > 0) {
      for (let i = start; i < end; i += step) {
        result.push(i)
      }
    } else {
      for (let i = start; i > end; i += step) {
        result.push(i)
      }
    }
  }

  return result
}

export function isEmpty(
  value: null | undefined | boolean | number | string | object | unknown[],
): boolean {
  if (value == null) {
    return true
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return false
  }

  if (typeof value === 'string') {
    return value.length === 0
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (value instanceof Object) {
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0
    }
    return Object.keys(value).length === 0
  }

  return false
}
