export const cx = (classList: (string | boolean)[]): string =>
  classList.filter((val) => !!val).join(' ')
