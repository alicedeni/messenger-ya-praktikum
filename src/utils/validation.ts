export type PatternType =
  | 'first_name'
  | 'second_name'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'message'

export function validateInput(value: string, type: PatternType): boolean {
  const patterns: Record<PatternType, RegExp> = {
    first_name: /^[A-ZА-Я][a-zа-яё]+$/,
    second_name: /^[A-ZА-Я][a-zа-яё]+$/,
    login: /^[a-zA-Z0-9_-]{3,20}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    phone: /^\+?\d{10,15}$/,
    message: /^.+$/,
  }

  return patterns[type].test(value)
}
