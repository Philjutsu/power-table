
import React, { useEffect, useState, useReducer } from 'react';
import _ from 'lodash'
import style from './style.scss'

const ToolBar = ({ children }) => {
    return (
        <div className={style.toolbar}>
            {children}
        </div>
    )
}

export const ToolBarSection = ({children}) => {
    return (
        <div className={style.toolbarSection}>
            {children}
        </div>
    )
}

export default ToolBar;