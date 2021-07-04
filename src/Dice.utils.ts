import { ReactChild } from 'react'
import {
  TValueClassMap,
  TFaceTransformMap,
  TDefaultFaceGrid,
} from './Dice.types'

export const valueClassMap: TValueClassMap = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
}

export const faceTransformMap: TFaceTransformMap = {
  1: (translate) => ({
    transform: `rotateX(-90deg) translate3d(0, 0, ${translate}px)`,
  }),
  2: (translate) => ({
    transform: `translate3d(0, 0, ${translate}px)`,
  }),
  3: (translate) => ({
    transform: `rotateY(180deg) translate3d(0, 0, ${translate}px)`,
  }),
  4: (translate) => ({
    left: '50%',
    marginLeft: `-${translate}px`,
    transform: `rotateY(-90deg) translate3d(0, 0, ${translate}px)`,
  }),
  5: (translate) => ({
    left: '50%',
    marginLeft: `-${translate}px`,
    transform: `rotateY(90deg) translate3d(0, 0, ${translate}px)`,
  }),
  6: (translate) => ({
    transform: `rotateX(90deg) translate3d(0, 0, ${translate}px)`,
  }),
}

export const defaultFaceGrid: TDefaultFaceGrid = {
  1: [12],
  2: [11, 13],
  3: [6, 12, 18],
  4: [6, 8, 16, 18],
  5: [6, 8, 12, 16, 18],
  6: [6, 8, 11, 13, 16, 18],
}

export const times = (
  counter: number,
  callback: (index: number) => ReactChild
): ReactChild[] => {
  const data = []
  for (let i = 0; i < counter; i++) {
    data.push(callback(i))
  }

  return data
}
