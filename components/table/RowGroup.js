import React, { useState, useRef, useEffect, forwardRef } from 'react';
import classNames from 'classnames'
import { v4 as uuid } from 'uuid';
import { gsap, TimelineMax, Back } from 'gsap'
import { actions } from '../../tableReducer'
import Row from './Row';
import TableItem from './TableItem';
import style from './css/style.scss';

const RowGroup = ({ rows, dispatch, columns, searchQuery }) => {
    const container = useRef(null);
    const list = useRef([]);

    useEffect(() => {
        gsap.from(list.current, { duration: .3, y: 15, scale: 1, autoAlpha: 0, ease: Back.easeInOut(1), stagger: 0.1 });
    }, []);
    
    return (
        <div className={style.rowGroup} ref={container}>
            {rows.map((row, rowIdx) => 
                <Row
                    key={row.id}
                    row={row}
                    dispatch={dispatch}
                    list={list}
                    ref={list[rowIdx]}
                    index={rowIdx}
                >
                    {columns.map((column) => {
                        const content = row.data[column.heading.value];
                        return (
                            <TableItem
                                key={row.id + uuid()}
                                {...{ row, column, dispatch, searchQuery }}
                                clickFunction={() => dispatch({ type: actions.SELECT_ROW, payload: row.id })}
                                lastRow={rowIdx + 1 === rows.length}
                                rowIdx={rowIdx}
                            >
                                {content}
                            </TableItem>
                        )
                    })}
                </Row>
            )}
        </div>
    )
}

export default RowGroup;