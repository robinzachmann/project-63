import React, { useEffect, useRef, useState } from 'react'
import styles from './Dice.module.scss'
import { TProps, TValue } from './Dice.types'
import {
  defaultFaceGrid,
  faceTransformMap,
  times,
  valueClassMap,
} from './Dice.utils'
import { cx } from 'src/style.utils'

export const Face = React.memo(
  ({ index, size }: { index: number; size: number }): React.ReactElement => {
    const valueClass = valueClassMap[(index + 1) as TValue]
    return (
      <div
        className={cx([styles._3dface, valueClass])}
        style={{
          ...faceTransformMap[(index + 1) as TValue](size / 2),
          width: size + 'px',
          height: size + 'px',
        }}
      >
        <div className={cx([styles.defaultFace, valueClass])}>
          {times(25, (idx) => (
            <div key={idx}>
              {defaultFaceGrid[(index + 1) as TValue].includes(idx) && <span />}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

const randomValue = (): TValue => (Math.floor(Math.random() * 6) + 1) as TValue

export const Dice = React.memo<TProps>(
  ({
    value = randomValue(),
    size = 50,
    rolling = false,
    ...rest
  }): React.ReactElement => {
    const [tmpValue, setTmpValue] = useState(randomValue())
    const timeoutRef = useRef<number>(0)

    // useEffect(() => {
    //   clearTimeout(timeoutRef.current)
    //   if (rolling) {
    //     setTmpValue(randomValue())
    //     const timeout = setTimeout(() => {
    //       setTmpValue(randomValue()) // will trigger a rerender
    //     }, Math.random() * 1000)
    //     timeoutRef.current = (timeout as unknown) as number
    //   }
    // }, [rolling, tmpValue])

    // const displayValue = rolling ? tmpValue : value
    // const valueString = valueClassMap[displayValue]
    const valueString = valueClassMap[value]

    return (
      <div
        style={{
          ...rest,
          width: size + 'px',
          height: size + 'px',
        }}
        className={cx([styles.dice, styles[`dice--${valueString}`]])}
      >
        <div className={cx([styles._3dbox, rolling && styles._3dface_rolling])}>
          <Face size={size} index={0} />
          <Face size={size} index={1} />
          <Face size={size} index={2} />
          <Face size={size} index={3} />
          <Face size={size} index={4} />
          <Face size={size} index={5} />
        </div>
      </div>
    )
  }
)
