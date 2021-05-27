import {
  LOWER_CATEGORY_KEYS,
  CategoryKey,
  UPPER_CATEGORY_KEYS,
  CATEGORY_LABEL_MAP,
} from './Game.config'
import { PlayerScore, Score } from './Game.types'

export const sumScoreValues = (
  score: Score,
  keys: readonly CategoryKey[]
): number =>
  keys.reduce<number>((acc, next) => {
    const scoreValue = score[next] || 0
    return acc + scoreValue
  }, 0)

export const areFieldsFilled = (
  score: Score,
  keys: readonly CategoryKey[]
): boolean =>
  keys.reduce<boolean>((acc, next) => {
    const isFilled = score[next] !== null
    return acc && isFilled
  }, true)

export const isTopFilled = (score: Score): boolean => {
  return areFieldsFilled(score, UPPER_CATEGORY_KEYS)
}

export const isBottomFilled = (score: Score): boolean => {
  return areFieldsFilled(score, LOWER_CATEGORY_KEYS)
}

export const scoreIsComplete = (score: Score): boolean => {
  return isTopFilled(score) && isBottomFilled(score)
}

export const calcUpperTotal = (score: Score): number => {
  return sumScoreValues(score, UPPER_CATEGORY_KEYS)
}

export const calcLowerTotal = (score: Score): number => {
  return sumScoreValues(score, LOWER_CATEGORY_KEYS)
}

export const calcBonus = (sumTop: number): number => {
  return sumTop >= 63 ? 35 : 0
}

export const calcGrandTotal = (score: Score): number => {
  const upperTotal = calcUpperTotal(score)
  const lowerTotal = calcLowerTotal(score)
  const bonus = calcBonus(upperTotal)
  return upperTotal + lowerTotal + bonus
}

export const getCategoryLabel = (categoryKey: CategoryKey): string => {
  return CATEGORY_LABEL_MAP[categoryKey]
}

export const INITIAL_SCORE: Score = {
  one: null,
  two: null,
  three: null,
  four: null,
  five: null,
  six: null,
  threeOfAKind: null,
  fourOfAKind: null,
  smallStraight: null,
  longStraight: null,
  fullHouse: null,
  kniffel: null,
  chance: null,
}

export const makePlayer = (no: number): PlayerScore => {
  return {
    ...INITIAL_SCORE,
    playerName: `Spieler:in ${no}`,
    playerNo: no,
  }
}
