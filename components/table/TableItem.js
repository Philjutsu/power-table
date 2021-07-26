import React, { useState, useRef, useEffect } from 'react';
import StringReplace from 'react-string-replace';
import classNames from 'classnames'
import { v4 as uuid } from 'uuid';

import style from './css/style.scss';

const TableItem = ({ children, row, column = {}, lastRow, cssClass, rowHovered, rowIdx, hoverFunction, clickFunction, isColumnHeader, searchQuery }) => {
    const rowSelected = row ? row.selected : undefined;
    const { heading } = column ? column : "";
    const [content, setContent] = useState(children);
    const container = useRef();

    let cssBooleans = {
        [style.rowSelected]: rowSelected,
        [style.columnSelected]: column.selected,
        [style.lastRow]: lastRow,
        [style.columnHeading]: isColumnHeader,
        [style.withQuery]: column.query
    }

    const searchHL = text => <span className={style.searchQueryHighlight} key={uuid()}>{text}</span>
    const columnHL = text => <span className={style.columnQueryHighlight} key={uuid()}>{text}</span>

    useEffect(() => {
        const { query: columnQuery } = column;
        let modified = content, update;
        let hasSearchQuery = searchQuery != '' && children
        let hasColumnQuery = columnQuery != '' && children

        if (hasSearchQuery) {
            modified = StringReplace(content, searchQuery, match => {
                update = match
                if (hasColumnQuery) update = StringReplace(match, columnQuery, txt => columnHL(txt))
                return searchHL(update)
            })
        }

        if (hasColumnQuery) {
            modified = StringReplace(update ? modified : content, columnQuery, txt => columnHL(txt))
        }

        !isColumnHeader && setContent(modified);

        // Maintains style on rerender
        column.query && container.current.classList.add(style.columnHighlighted);

    }, [searchQuery, column.query])

    return (
        <div
            className={classNames(style.tableItem, cssBooleans, cssClass)}
            onClick={clickFunction}
            ref={container}
            onMouseOver={hoverFunction}
            onMouseOut={hoverFunction}
            data-column-id={column.id}
            title={heading.display}
        >
            <div className={style.container}>
                {heading && !isColumnHeader &&
                    <b className={classNames(style.itemHeading, style.columnTitle)}>
                        {heading.display}
                    </b>
                }
                <div className={style.content}>
                    {content || '-'}
                </div>
            </div>
            <div className={style.shadow} />
        </div>
    )
}

export default TableItem;