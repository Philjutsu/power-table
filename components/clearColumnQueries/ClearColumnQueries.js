import React, { useState, useRef, useEffect, forwardRef } from 'react';
import classNames from 'classnames'
import style from './style.scss';

import { actions } from '../../tableReducer'

const ClearHeadingQueries = ({ dispatch, hasColumnQuery}) => {

    const handleClick = e => dispatch({type: actions.CLEAR_COLUMN_QUERYS})
    const cssBooleans = {
        [style.disable]: !hasColumnQuery
    }

    return (
        <div
            onClick={handleClick}
            className={classNames(style.clearColumnQueries, cssBooleans)}
        >
            Clear Column Search
        </div>
    )
}

export default ClearHeadingQueries;