import React from 'react';
import style from './style.scss';

import RecordCount from './RecordCount';

const TableTitle = ({ title, currentTotal, initialCount}) => {
    return (
        <div className={style.tableTitle}>
            <b className={style.title}>{title}</b>
            <span className={style.dividerColon}>:</span>
            <RecordCount current={currentTotal} initialCount={initialCount} />
        </div>
    )
}

export default TableTitle;