export const UPPER_CATEGORY_KEYS = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
] as const

export const LOWER_CATEGORY_KEYS = [
  'threeOfAKind',
  'fourOfAKind',
  'smallStraight',
  'longStraight',
  'fullHouse',
  'kniffel',
  'chance',
] as const

export const CATEGORY_KEYS = [
  ...UPPER_CATEGORY_KEYS,
  ...LOWER_CATEGORY_KEYS,
] as const

export const CATEGORY_LABEL_MAP: Record<CategoryKey, string> = {
  one: '1 er',
  two: '2 er',
  three: '3 er',
  four: '4 er',
  five: '5 er',
  six: '6 er',
  threeOfAKind: 'Dreierpasch',
  fourOfAKind: 'Viererpasch',
  smallStraight: 'Kleine Straße',
  longStraight: 'Große Straße',
  fullHouse: 'Full House',
  kniffel: 'Kniffel',
  chance: 'Chance',
}

export type CategoryKey =
  | typeof UPPER_CATEGORY_KEYS[number]
  | typeof LOWER_CATEGORY_KEYS[number]

export const BONUS_THRESHOLD = 63
export const BONUS_VALUE = 35

export const confettiConfig = {
  angle: 90,
  spread: 42,
  startVelocity: 61,
  elementCount: 70,
  dragFriction: 0.15,
  duration: 4730,
  stagger: 2,
  width: '11px',
  height: '11px',
  perspective: '749px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}
