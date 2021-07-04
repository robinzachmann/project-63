import { createState, State } from '@hookstate/core'
import { createContext, useContext } from 'react'
import { TValue } from 'src/Dice.types'

export const DICES_NUMBERS = [1, 2, 3, 4, 5] as const
export type DiceNumber = typeof DICES_NUMBERS[number]
export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6

export type DiceStateValue = {
  rolling: boolean
  currentValue: DiceValue
  locked: boolean
}

export type DicesDict = Record<DiceNumber, DiceStateValue>

export type DiceBoardStateValue = {
  isOpen: boolean
  dices: DicesDict
  rollsCount: number
}

export type DicesBoardContextValue = {
  state: State<DiceBoardStateValue>
  roll: () => void
  toggleBoard: () => void
  resetDices: () => void
}

const randomValue = (): TValue => Math.floor(Math.random() * 7) as DiceValue

const makeInitialDicesDict = (): DicesDict =>
  DICES_NUMBERS.reduce((acc, diceNo) => {
    acc[diceNo] = {
      rolling: false,
      currentValue: 1,
      locked: false,
    }
    return acc
  }, {} as DicesDict)

const makeInitialDiceBoardState = () => ({
  dices: makeInitialDicesDict(),
  isOpen: false,
  rollsCount: 0,
})

const state = createState<DiceBoardStateValue>(makeInitialDiceBoardState())

export const DiceBoardContext = createContext<DicesBoardContextValue>({
  state,
  roll: () => null,
  toggleBoard: () => null,
  resetDices: () => null,
})

export const DiceBoardProvider: React.FC = (props) => {
  const roll = () => {
    state.rollsCount.set((prev) => prev + 1)
    state.batch((s) => {
      s.dices.keys.forEach((diceNo) => {
        const diceState = s.dices[diceNo]
        diceState.set((prev) => ({ ...prev, rolling: true }))
        setTimeout(() => {
          diceState.set((prev) => ({
            ...prev,
            rolling: false,
            currentValue: prev.locked ? prev.currentValue : randomValue(),
          }))
        }, Math.max(Math.random() * 2000, 300))
      })
    })
  }

  const toggleBoard = () => {
    state.set((prev) => {
      return prev.isOpen
        ? {
            ...prev,
            isOpen: false,
          }
        : {
            // reset state on open
            ...makeInitialDiceBoardState(),
            isOpen: true,
          }
    })
  }

  const resetDices = () => {
    const initialState = makeInitialDiceBoardState()
    return state.set((prev) => ({
      dices: Object.entries(prev.dices).reduce((acc, [key, val]) => {
        acc[parseInt(key) as keyof DicesDict] = {
          ...val,
          locked: false,
          rolling: false,
        }
        return acc
      }, {} as DicesDict),
      rollsCount: initialState.rollsCount,
      isOpen: prev.isOpen,
    }))
  }

  return (
    <DiceBoardContext.Provider value={{ state, roll, toggleBoard, resetDices }}>
      {props.children}
    </DiceBoardContext.Provider>
  )
}

export const useDiceBoard = (): DicesBoardContextValue =>
  useContext(DiceBoardContext)
