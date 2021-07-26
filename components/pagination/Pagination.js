import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'

import style from './style.scss';
import { updateBounce } from '../../animations'

const Pagination = ({ currentPage, pageCount, total, updatePagination }) => {
    const next = () => updatePagination(currentPage + 1);
    const previous = () => updatePagination(currentPage - 1);
    const first = () => updatePagination(1);
    const last = () => updatePagination(pageCount);

    const pageInputRef = useRef(null);
    const [inputToggled, setInputToggled] = useState(false);

    const togglePageSelection = e => {
        if(!inputToggled) {
            pageInputRef.current.style = 'display:inline-block'
            currentPageRef.current.style = 'display:none'
        } else {
            pageInputRef.current.style = 'display:none'
            currentPageRef.current.style = 'display:inline-block'
        }

        setInputToggled(!inputToggled)
    }

    const [selectionValue, setSelectionValue] = useState(currentPage);
    const pageSelectionChange = e => {
        const {value, keyCode, key, type} = e.target;
        setSelectionValue(value);

        setInputToggled(false)
        togglePageSelection()
        if (keyCode === 'Enter') {
        }
    }

    const pagesRef = useRef(null);
    const currentPageRef = useRef(null);
    useEffect(() => updateBounce(pagesRef.current), [pageCount])
    useEffect(() => {
        updateBounce(currentPageRef.current)
    }, [currentPage])

    return (
        <div className={style.pagination}>
            <a onClick={first} className={style.pagiBtn}>{`<< `}</a>
            <a onClick={previous} className={style.pagiBtn}>{'< '}</a>

            <div  className={style.pagiBtn}>
                <span className={classNames(style.pageCount)}>
                    <span ref={currentPageRef} className={classNames(style.number, style.currentPages)} onClick={togglePageSelection}>
                        {currentPage}
                    </span>
                    <input
                        type="number"
                        min={1}
                        max={pageCount}
                        className={style.pageSelectionInput}
                        ref={pageInputRef}
                        onChange={pageSelectionChange}
                        onKeyPress={pageSelectionChange}
                        onBlur={pageSelectionChange}
                        value={selectionValue}
                    />
                    <span className={style.divider}>/</span>
                    <span ref={pagesRef} className={classNames(style.number, style.pages)}>
                        {pageCount}
                    </span>
                </span>
            </div>

            <a onClick={next} className={style.pagiBtn}>{' >'}</a>
            <a onClick={last} className={style.pagiBtn}>{' >>'}</a>
        </div>
    )
}

export default Pagination;