import styles from './DiceBoard.module.scss'
import { Dice } from './Dice'
import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { useState } from '@hookstate/core'
import { DiceNumber, DICES_NUMBERS, useDiceBoard } from 'src/DiceBoardContext'
import { cx } from 'src/style.utils'

export const RollsCountDisplay = (): React.ReactElement => {
  const board = useDiceBoard()
  const rollsCount = useState(board.state.rollsCount).get()
  return <span className={styles.rollsCountDisplay}>{rollsCount}</span>
}

const DiceCell = (props: { diceNo: DiceNumber }): React.ReactElement => {
  const board = useDiceBoard()
  const diceState = useState(board.state.dices[props.diceNo])
  const diceStateValue = diceState.get()
  return (
    <button
      onClick={() => diceState.locked.set((prev) => !prev)}
      className={cx([
        styles.diceButton,
        diceStateValue.locked && styles.locked,
      ])}
    >
      <Dice
        value={diceStateValue.currentValue}
        rolling={diceStateValue.rolling && !diceStateValue.locked}
      />
    </button>
  )
}

export const DiceBoard = (): React.ReactElement => {
  const diceBoard = useDiceBoard()
  const boardState = useState(diceBoard.state)

  const isOpen = boardState.isOpen.get()

  useEffect(() => {
    if (isOpen) {
      // roll when board opens
      diceBoard.roll()
    }
  }, [isOpen, diceBoard])

  return (
    <Modal
      isOpen={isOpen}
      className={styles.Modal}
      overlayClassName={styles.ModalOverlay}
      shouldCloseOnEsc={true}
      onRequestClose={diceBoard.toggleBoard}
    >
      <div className={styles.board}>
        <RollsCountDisplay />
        <div className={styles.dicesGrid}>
          {DICES_NUMBERS.map((diceNo) => {
            return <DiceCell key={diceNo} diceNo={diceNo} />
          })}
          <button onClick={diceBoard.roll} className={styles.actionButton}>
            Roll
          </button>
          <button
            onClick={diceBoard.resetDices}
            className={styles.actionButton}
          >
            Reset
          </button>
        </div>
        <button onClick={diceBoard.toggleBoard} className={styles.closeButton}>
          ❌
        </button>
      </div>
    </Modal>
  )
}
