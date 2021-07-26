import React from 'react';
import classNames from 'classnames'
import style from './css/style.scss';

const Row = ({ children, list, index, head, row  }) => {
    const cssBooleans = {
        [style.titleRow]: head,
        [style.rowSelected]: row && row.selected
    }

    return (
        <div
            className={classNames(style.tableRow, cssBooleans)}
            ref={e => list && (list.current[index] = e)}
        >
            {children}
        </div>

    )
}

export default Row;