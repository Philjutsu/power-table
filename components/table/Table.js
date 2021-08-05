import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames'
import Row from './Row'
import RowGroup from './RowGroup'
import HeadingColumn from './HeadingColumn'
import { v4 as uuid } from 'uuid';

import style from './css/style.scss';

import { columnDrag } from './dragColumns'

const Table = ({ columns, dispatch, pages, currentPage, searchQuery, hasColumnQuery, pageSize }) => {
    const rowContainerRef = useRef(null);
    const tableID = uuid();

    const columnHighlight = (columnID, toggle) => {
        const items = document.querySelectorAll(`[data-column-id*="${columnID}"]`);

        if(items.length > 0) {
            if(toggle) {
                items.forEach(d => d.classList.add(style.columnHighlighted));
            } else {
                items.forEach(d => d.classList.remove(style.columnHighlighted));
            }
        }
    }

    useEffect(() => {
        columns.map((column) => {
            columnDrag(column, tableID, columns);
        })
    }, [columns])
    
    return (
        <div className={classNames(style.table, 'table')} id={tableID}>
            <div className={style.headingContainer}>
                <Row head>
                    {columns.map((column, idx) => 
                        <HeadingColumn
                            key={column.id}
                            {...{ dispatch, column, columnHighlight, hasColumnQuery}}
                        />
                    )}
                </Row>
            </div>

            <div className={style.rowContainer} ref={rowContainerRef}>
            
            {pages.length > 0
                ? (pages.map((rows, idx) => {
                        if(currentPage - 1 === idx) {
                            return (
                                <RowGroup
                                    {...{ rows, dispatch, columns, searchQuery }}
                                    key={'page' + idx}
                                    idx={idx}
                                />
                            )
                        }
                    }))
                : (<div className={style.noResults}>NO RECORDS</div>)
            }
            </div>
        </div>
    )
}

export default Table;