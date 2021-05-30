import React, { useEffect } from 'react'
import styles from './Game.module.scss'

import { createState, useState } from '@hookstate/core'
import { Persistence } from '@hookstate/persistence'
import { LOWER_CATEGORY_KEYS, UPPER_CATEGORY_KEYS } from './Game.config'
import { PlayerScore } from './Game.types'
import { INITIAL_SCORE, makePlayer } from './Game.utils'
import { motion } from 'framer-motion'
import {
  Bonus,
  CategoryRow,
  GrandTotal,
  LowerTotal,
  PlayerName,
  Row,
  UpperTotal,
} from './Game.components'
import { WinnerProvider } from './Game.hooks'
import { cx } from './style.utils'

const globalState = createState<PlayerScore[]>([makePlayer(1), makePlayer(2)])

export const Game = (): React.ReactElement => {
  const playerScoresList = useState(globalState)

  useEffect(() => {
    globalState.attach(Persistence('game-state'))
  }, [])

  const removeLastPlayer = (): void => {
    playerScoresList.set((playerList) => playerList.slice(0, -1))
  }

  const addPlayer = () => {
    playerScoresList.merge((playerState) => {
      const maxPlayerNo = playerState
        .map((playerState) => playerState.playerNo)
        .reduce((prev, next) => Math.max(prev, next), 0)
      return [makePlayer(maxPlayerNo + 1)]
    })
  }

  const reset = () => {
    playerScoresList.set((playerList) =>
      playerList.map((playerScore) => ({
        ...INITIAL_SCORE,
        playerName: playerScore.playerName,
        playerNo: playerScore.playerNo,
      }))
    )
  }

  return (
    <WinnerProvider playerScoresList={playerScoresList}>
      <form
        className={styles.board}
        onSubmit={(e) => e.preventDefault()}
        autoComplete={'off'}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span>Kniffel Block für Kim&nbsp;&nbsp;♥️</span>
          </h1>
          <div className={styles.actions}>
            {/*<FinishGame playerScoresList={playerScoresList} />*/}
            <motion.button
              onClick={reset}
              className={styles.actionButton}
              whileHover={{ scale: 1.2, x: -5 }}
            >
              🗑️ <span>reset</span>
            </motion.button>
            <motion.button
              onClick={removeLastPlayer}
              className={cx([
                styles.actionButton,
                styles.actionButtonWithBadge,
                styles.actionButtonRemove,
              ])}
              whileHover={{ scale: 1.2 }}
            >
              🙅 <span>remove</span>
            </motion.button>
            <motion.button
              onClick={addPlayer}
              className={cx([
                styles.actionButton,
                styles.actionButtonWithBadge,
                styles.actionButtonAdd,
              ])}
              whileHover={{ scale: 1.2, x: 5 }}
            >
              🙋 <span>add</span>
            </motion.button>
          </div>
        </div>
        <div className={styles.main}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ position: 'static' }}>
                  <div
                    className={cx([
                      styles.cell,
                      styles.cellHead,
                      styles.cellCorner,
                    ])}
                  />
                </th>
                {playerScoresList.map((player, idx) => {
                  return (
                    <th key={idx}>
                      <div
                        className={cx([
                          styles.cell,
                          styles.cellHead,
                          styles.cellHeadTop,
                        ])}
                      >
                        <PlayerName playerState={player} />
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {UPPER_CATEGORY_KEYS.map((categoryKey) => {
                return (
                  <CategoryRow
                    key={categoryKey}
                    categoryKey={categoryKey}
                    playerListState={playerScoresList}
                  />
                )
              })}
              <Row
                heading={'Summe (o)'}
                playerScoresList={playerScoresList}
                cellComponent={UpperTotal}
              />
              <Row
                heading={'Bonus'}
                playerScoresList={playerScoresList}
                cellComponent={Bonus}
              />
              {LOWER_CATEGORY_KEYS.map((categoryKey) => {
                return (
                  <CategoryRow
                    key={categoryKey}
                    categoryKey={categoryKey}
                    playerListState={playerScoresList}
                  />
                )
              })}
              <Row
                heading={'Summe (u)'}
                playerScoresList={playerScoresList}
                cellComponent={LowerTotal}
              />
              <Row
                heading={'Summe'}
                playerScoresList={playerScoresList}
                cellComponent={GrandTotal}
              />
            </tbody>
          </table>
        </div>
      </form>
    </WinnerProvider>
  )
}
