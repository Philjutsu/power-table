import React from 'react';
import style from './style.scss';

import RecordCount from './RecordCount';

const TableTitle = ({ title, currentTotal, initialCount}) => {
    return (
        <div className={style.tableTitle}>
            <h3 className={style.title}>{title}</h3>
            <span className={style.dividerColon}>:</span>
            <RecordCount current={currentTotal} initialCount={initialCount} />
        </div>
    )
}

export default TableTitle;