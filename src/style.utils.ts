export const cx = (classList: (string | boolean | null)[]): string =>
  classList.filter((val) => !!val).join(' ')
