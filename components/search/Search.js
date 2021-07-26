import React from 'react';
import style from './style.scss';

const Search = ({queryChange}) => {
    return (
        <div className={style.search}>
            <label>Search</label>
            <input
                type="search"
                onChange={e => queryChange(e.target.value)}
                placeholder="Search"
            />
        </div>
    )
}

export default Search;