import React from 'react';
import classNames from 'classnames'
import * as config from './config'
import style from './style.scss';

const ToggleBtn = ({ handleToggle, hasSelected, name, value, checked, optionStyle, displayType }) => {
    const isChecked = checked === value
    const htmlID = `id-toggle-${displayType}-${name}`
    const displayTypeString = config.getInputString(displayType);

    const cssBooleans = {
        [style.disabled]: !hasSelected,
        [style.checked]: isChecked
    }

    console.log('displayType', displayType, displayTypeString);

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
            >
                <svg
                    className={classNames(style.toggleBtn, { [style.checked]: isChecked }, style[displayTypeString], style[optionStyle])}
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

