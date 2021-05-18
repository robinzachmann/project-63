import React, { createContext } from 'react'
import { State, useState } from '@hookstate/core'
import { PlayerResult, PlayerScore } from './Game.types'
import { scoreIsComplete, calcGrandTotal } from './Game.utils'

export const WinnersContext = createContext<PlayerResult[]>([])

export const WinnerProvider: React.FC<{
  playerScoresList: State<PlayerScore[]>
}> = (props) => {
  const playerScoreList = useState(props.playerScoresList).get()

  const completeScoresList = playerScoreList.filter((playerScore) =>
    scoreIsComplete(playerScore)
  )
  const playerResultsList = completeScoresList.map((playerScore) => ({
    ...playerScore,
    grandTotal: calcGrandTotal(playerScore),
  }))
  const maxGrandTotal = playerResultsList.reduce(
    (prev, next) => Math.max(prev, next.grandTotal),
    0
  )
  const allCompleted = completeScoresList.length === playerScoreList.length
  const winningPlayersList = allCompleted
    ? playerResultsList.filter(
        (playerScore) => playerScore.grandTotal === maxGrandTotal
      )
    : []

  return (
    <WinnersContext.Provider value={winningPlayersList}>
      {props.children}
    </WinnersContext.Provider>
  )
}
