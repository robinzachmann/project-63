import { CategoryKey } from './Game.config'

export type ScoreValue = null | number

export type Score = Record<CategoryKey, ScoreValue>

export interface PlayerScore extends Score {
  playerName: string
  playerNo: number
}

export interface PlayerResult extends PlayerScore {
  grandTotal: number
}

export type { CategoryKey }
