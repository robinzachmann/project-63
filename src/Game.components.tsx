import { State, useState } from '@hookstate/core'
import { CategoryKey, PlayerScore } from './Game.types'
import React, { ChangeEvent, useContext, useRef } from 'react'
import styles from './Game.module.scss'
import { CATEGORY_LABEL_MAP, confettiConfig } from './Game.config'
import {
  calcBonus,
  calcLowerTotal,
  calcUpperTotal,
  getCategoryLabel,
  isTopFilled,
  calcGrandTotal,
} from './Game.utils'
import { cx } from './style.utils'
import { WinnersContext } from './Game.hooks'
import Confetti from 'react-dom-confetti'

export const PlayerName = (props: {
  playerState: State<PlayerScore>
}): React.ReactElement => {
  const playerState = useState(props.playerState)
  const playerName = playerState.playerName.get()
  const inputRef = useRef<HTMLInputElement>(null)
  const prevPlayerName = useRef<string>(playerName)

  if (playerName) {
    prevPlayerName.current = playerName
  }

  const onBlur = () => {
    if (!playerName) {
      playerState.playerName.set(prevPlayerName.current)
    }
  }

  const handleClick = () => {
    playerState.playerName.set('')
    inputRef.current?.focus()
  }

  return (
    <>
      <input
        value={playerName}
        onChange={(e) => playerState.playerName.set(e.target.value)}
        className={cx([styles.input, styles.inputName])}
        autoComplete={'off'}
        data-lpignore={'true'} // last pass
        ref={inputRef}
        onBlur={onBlur}
      />
      <button onClick={handleClick} className={styles.removeButton}>
        ❌
      </button>
    </>
  )
}

export const CategoryInput = (props: {
  playerState: State<PlayerScore>
  categoryKey: CategoryKey
}): React.ReactElement => {
  const playerState = useState(props.playerState)
  const categoryState = playerState[props.categoryKey]
  const scoreValue = categoryState.get() ?? ''

  const playerNo = playerState.playerNo.get()
  const inputId = `player_${playerNo}_category_${props.categoryKey}`
  const label = getCategoryLabel(props.categoryKey)
  const isSkipped = scoreValue === 0
  const isFilled = !!scoreValue

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const inputNumberValue = parseInt(inputValue)

    if (inputValue === '') {
      categoryState.set(null)
    } else if (!Number.isNaN(inputNumberValue) && inputNumberValue <= 50) {
      categoryState.set(inputNumberValue)
    }
  }

  return (
    <>
      <label htmlFor={inputId} className={'visually-hidden'}>
        {label}
      </label>
      <input
        id={inputId}
        value={scoreValue.toString()}
        onChange={handleChange}
        className={cx([
          styles.input,
          styles.inputNumber,
          isSkipped && styles.inputSkipped,
          isFilled && styles.inputFilled,
        ])}
        type={'text'}
        pattern={'[0-9]*'}
        autoComplete={'off'}
        data-lpignore={'true'} // last pass
        inputMode={'numeric'}
      />
    </>
  )
}

export const Row = (props: {
  heading: string
  playerScoresList: State<PlayerScore[]>
  cellComponent: (props: {
    playerState: State<PlayerScore>
  }) => React.ReactElement
}): React.ReactElement => {
  return (
    <tr>
      <th>
        <div
          className={cx([
            styles.cell,
            styles.cellLeft,
            styles.cellHead,
            styles.cellHeadLeft,
          ])}
        >
          {props.heading}
        </div>
      </th>
      {props.playerScoresList.map((player, idx) => {
        return (
          <td key={idx}>
            <div className={cx([styles.cell])}>
              <props.cellComponent playerState={player} />
            </div>
          </td>
        )
      })}
    </tr>
  )
}

export const CategoryRow = ({
  categoryKey,
  playerListState,
}: {
  categoryKey: CategoryKey
  playerListState: State<PlayerScore[]>
}): React.ReactElement => {
  return (
    <tr>
      <th>
        <div
          className={cx([
            styles.cell,
            styles.cellLeft,
            styles.cellHead,
            styles.cellHeadLeft,
          ])}
        >
          <span>{CATEGORY_LABEL_MAP[categoryKey]}</span>
        </div>
      </th>
      {playerListState.map((playerState, idx) => {
        return (
          <td key={idx}>
            <div className={cx([styles.cell, styles.cellDefault])}>
              <CategoryInput
                playerState={playerState}
                categoryKey={categoryKey}
              />
            </div>
          </td>
        )
      })}
    </tr>
  )
}

export const UpperTotal = ({
  playerState,
}: {
  playerState: State<PlayerScore>
}): React.ReactElement => {
  const _playerState = useState(playerState)
  const upperTotal = calcUpperTotal(_playerState.get())
  return <div className={styles.score}>{upperTotal}</div>
}

export const LowerTotal = ({
  playerState,
}: {
  playerState: State<PlayerScore>
}): React.ReactElement => {
  const _playerState = useState(playerState)
  const lowerTotal = calcLowerTotal(_playerState.get())
  return <div className={styles.score}>{lowerTotal}</div>
}

export const Bonus = (props: {
  playerState: State<PlayerScore>
}): React.ReactElement => {
  const playerState = useState(props.playerState)
  const score = playerState.get()
  const upperTotal = calcUpperTotal(score)
  const bonus = calcBonus(upperTotal)
  const _topIsFilled = isTopFilled(score)
  return bonus ? (
    <div className={styles.score}>
      {bonus}&nbsp;&nbsp;<span>✅</span>
    </div>
  ) : (
    <div className={styles.score}>{_topIsFilled ? '❌' : '🤔'}</div>
  )
}

export const GrandTotal = (props: {
  playerState: State<PlayerScore>
}): React.ReactElement => {
  const playerScore = useState(props.playerState).get()
  const winners = useContext(WinnersContext)
  const isWinner = !!winners.find(
    (winner) => winner.playerNo === playerScore.playerNo
  )
  const grandTotal = calcGrandTotal(playerScore)
  return (
    <div className={styles.score}>
      {grandTotal} {isWinner && '👑'}
      <Confetti active={isWinner} config={confettiConfig} />
    </div>
  )
}
