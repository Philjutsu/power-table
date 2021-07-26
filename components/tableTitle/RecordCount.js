import React, { useEffect, useRef } from 'react';
import classNames from 'classnames'
import { updateBounce } from '../../animations'
import style from './style.scss'

const RecordCount = ({ total, current = 0, initialCount = 0 }) => {
    const recordsRef = useRef(null);

    useEffect(() => updateBounce(recordsRef.current), [current])

    return (
        <div className={style.recordCount}>
            <span ref={recordsRef} className={classNames(style.number)}>
                {current}
            </span>
            <span className={classNames(style.number, style.initialCount)}>
                 /{initialCount}
            </span>
            <span className={style.label}>
                Records
            </span>
        </div>
    )
}

export default RecordCount;