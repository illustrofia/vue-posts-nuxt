export const removeUndefined = <T>(value: T | undefined): value is T =>
  value !== undefined
