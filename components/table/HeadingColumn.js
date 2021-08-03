import React, { useState, useRef, useEffect, forwardRef } from 'react';
import classNames from 'classnames'
import { gsap } from 'gsap'

import { actions } from '../../tableReducer'
import style from './css/style.scss';
import TableItem from './TableItem';

const HeadingColumn = ({ children, column, columnHighlight, dispatch, hasColumnQuery }) => {
    const inputRef = useRef(null);

    const handleHover = e => columnHighlight(column.id, e.type === 'mouseover')
    const handleClick = e => dispatch({ type: actions.SELECT_COLUMN, payload: column.id })

    const queryChange = e => {
        const query = e.target.value;

        dispatch({
            type: actions.COLUMN_QUERY,
            payload: {
                id: column.id,
                query
            }
        })
    }

    useEffect(() => {
        if(!hasColumnQuery) inputRef.current.value = ''
    }, [hasColumnQuery])

    return (
        <TableItem
            column={column}
            isColumnHeader
            hoverFunction={handleHover}
        >
            
            <div className={classNames(style.columnDragHandle, 'dragHandle')}></div>
            
            <div className={style.text}>
                <span onClick={handleClick}>
                    {column.heading.display}
                </span>
                {children}
            </div>
            <input
                className={style.columnSearch}
                type="search"
                onChange={queryChange}
                onFocus={e => columnHighlight(column.id, true)}
                onBlur={e => columnHighlight(column.id, false)}
                ref={inputRef}
                aria-label={`Search ${column.heading.display} column`}
            />
        </TableItem>
    )
}

export default HeadingColumn;