import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames'
import { gsap, Back } from 'gsap'
import { v4 as uuid } from 'uuid';
import ToggleBtn from './ToggleBtn'
import * as config from './config'
import { actions } from '../../tableReducer'
import style from './style.scss';


const ToggleData = ({ toggle, count, hasSelected, dispatch, displayType }) => {
    const countRef = useRef(null);
    const inputConfig = config.getInputConfig(displayType);
    const [checked, setChecked] = useState(config.values.SHOW_ALL);
    const clearText = `Clear ${config.getInputString(displayType)} selections`;

    const handleToggle = e => {
        if (!hasSelected) return;
        const value = e.target.value;
        setChecked(value);
        toggle(value);
    }
    
    const selectionType = displayType === config.values.TYPE_ROW ? actions.CLEAR_SELECTED_ROWS : actions.CLEAR_SELECTED_COLUMNS
    const clearSelections = e => dispatch({ type: selectionType })

    useEffect(() => {
        if (count > 0) {
            gsap.set(countRef.current, { scale: 0 })
            gsap.to(countRef.current, { scale: 1, duration: .3, ease: Back.easeOut });
            toggle(checked);
        }

        if (count == 0) {
            gsap.to(countRef.current, { scale: 0, duration: .3, ease: Back.easeIn });
            setChecked(config.values.SHOW_ALL);
            toggle(config.values.SHOW_ALL);
        }

    }, [count])

    return (
        <div className={style.container}>
            <div
                className={classNames(style.clear, {[style.disabled]: !hasSelected })}
                onClick={clearSelections}
                title={clearText}
            >
                x
            </div>
            <div className={style.radioButton}>
                {inputConfig.map(input => {
                    return (
                        <ToggleBtn
                            {...input}
                            {...{ handleToggle, checked, hasSelected }}
                            key={uuid()}
                        />
                    )
                })}
            </div>
            <span className={classNames(style.count)} ref={countRef}>
                {count}
            </span>
        </div>
    )
}

export default ToggleData;
