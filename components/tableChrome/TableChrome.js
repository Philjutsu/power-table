import React from 'react';
import classNames from 'classnames'
import style from './style.scss';


const TableChrome = ({ children }) => {
    return (
        <div className = { style.tableChrome } >
            {children}
        </div>
    )
}

export default TableChrome;