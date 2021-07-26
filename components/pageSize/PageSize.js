import React, { useState } from 'react';

import style from './style.scss';

const PageSize = ({changePageSize, pageSize}) => {

    return (
        <div>
            PageSize:
            <select onChange={changePageSize} value={pageSize} className={style.pageSize}>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
        </div>
    )
}

export default PageSize;