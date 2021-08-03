import React, { useEffect, useRef } from 'react';
import style from './style.scss';

const Search = ({queryChange}) => {
    const input = useRef(null)

    useEffect(() => {
        input.current.focus();
    },[])

    return (
        <div className={style.search}>
            <label>Search</label>
            <input
                type="search"
                onChange={e => queryChange(e.target.value)}
                placeholder="Search"
                aria-label={'Search all records'}
                ref={input}
            />
        </div>
    )
}

export default Search;