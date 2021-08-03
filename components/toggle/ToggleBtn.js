import React from 'react';
import classNames from 'classnames'
import * as config from './config'
import style from './style.scss';

const ToggleBtn = ({ handleToggle, hasSelected, name, value, labelTitle, text, checked, optionStyle, displayType }) => {
    const isChecked = checked === value
    const htmlID = `id-toggle-${displayType}-${name}`

    const cssBooleans = {
        [style.disabled]: !hasSelected,
        [style.checked]: isChecked
    }

    return (
        <div className={classNames(style.radioButton, cssBooleans)}>
            <input
                type="radio"
                name={name}
                value={value}
                onChange={handleToggle}
                className={style.radioInput}
                checked={isChecked}
                id={htmlID}
            />
            <label
                htmlFor={htmlID}
                title={labelTitle}
            >
                <svg
                    className={classNames(style.toggleBtn, { [style.checked]: isChecked }, style[text], style[optionStyle])}
                >
                    <rect className={style.bar} />
                    <rect className={style.bar} />
                    <rect className={style.bar} />
                </svg>
            </label>
        </div>
    )
}

export default ToggleBtn;

