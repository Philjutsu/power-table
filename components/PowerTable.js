import React, { useEffect, useState, useReducer } from 'react';
import _ from 'lodash'

import Table from './table/Table'
import PageSize from './pageSize/PageSize'
import Search from './search/Search'
import ToggleData from './toggle/ToggleData'
import Pagination from './pagination/Pagination'
import TableTitle from './tableTitle/TableTitle';

import ToolBar, { ToolBarSection } from './toolbar/ToolBar'
import ClearColumnQueries from './clearColumnQueries/ClearColumnQueries';

import data from '../data';

import { tableReducer, formatData } from '../tableReducer'
import * as toggleDataConfig from './toggle/config'
import TableChrome from './tableChrome/TableChrome';

const PowerTable = ({mediaSize}) => {
    const initialData = formatData(data);
    const [state, dispatch] = useReducer(tableReducer, initialData);

    // Search
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination
    const initialDataTotal = initialData.rows.length;
    const [total, setTotal] = useState(state.rows.length);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasColumnQuery, setHasColumnQuery] = useState(false);
    const [pages, setPages] = useState([]);
    const [columns, setColumns] = useState(state.columns);

    const applyQueries = (data = state.rows) => {
        let result = data;
        const isMatch = (item, query) => typeof item == 'string' && item.toLowerCase().indexOf(query.toLowerCase()) !== -1;

        if (searchQuery != '') {
            result = result.filter(row => {
                for (let key of Object.keys(row.data)) {
                    let value = row.data[key];
                    if (isMatch(value, searchQuery) && result.indexOf(value) == -1) {
                        return true;
                    }
                }
            })
        }

        for (let column of state.columns) {
            if (column.query !== '') {
                result = result.filter(row => {
                    let value = row.data[column.heading.value]

                    return isMatch(value, column.query) && result.indexOf(value) == -1
                })
            }
        }

        setCurrentPage(1);
        setTotal(result.length);
        return result;
    }

    const chunkPages = (rows) => {
        const matched = applyQueries(rows);
        const chunked = _.chunk(matched, pageSize);
        if (pages.length && pages.length !== chunked.length) setCurrentPage(1);
        setPages(chunked)
    }

    const changePageSize = e => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(1);
    }

    const updatePagination = selectedPage => {
        const pageCount = pages.length;
        setCurrentPage(selectedPage <= 0 ? 1 : selectedPage >= pageCount ? pageCount : selectedPage)
    }

    const toggleRows = value => {
        let toggled = state.rows;

        switch (value) {
            case toggleDataConfig.values.SHOW_ALL:
                toggled = state.rows;
                break;
            case toggleDataConfig.values.SHOW_SELECTED:
                toggled = state.rows.filter(row => row.selected)
                break;
            case toggleDataConfig.values.HIDE_SELECTED:
                toggled = state.rows.filter(row => !row.selected)
                break;
            default:
                toggled = state.rows;
                break;
        }
        chunkPages(toggled);
    }

    const toggleColumns = value => {
        let toggled = state.column;

        switch (value) {
            case toggleDataConfig.values.SHOW_ALL:
                toggled = state.columns;
                break;
            case toggleDataConfig.values.SHOW_SELECTED:
                toggled = state.columns.filter(column => column.selected)
                break;
            case toggleDataConfig.values.HIDE_SELECTED:
                toggled = state.columns.filter(column => !column.selected)
                break;
            default:
                toggled = state.columns;
                break;
        }

        setColumns(toggled)
    }

    const hasSelectedRows = state.rows.some(row => row.selected)
    const hasSelectedColumns = state.columns.some(column => column.selected)

    const selectedRowsCount = state.rows.filter(row => row.selected).length
    const selectedColumnsCount = state.columns.filter(column => column.selected).length

    useEffect(() => {
        setHasColumnQuery(() => state.columns.some(d => d.query !== ''));
        chunkPages();
    }, [pageSize, searchQuery, state.columns])

    return (
        <div>
            <TableTitle title={"Power Table"} initialCount={initialDataTotal} currentTotal={total} />
            <TableChrome>
                <Search value={searchQuery} queryChange={setSearchQuery} />
                {mediaSize === 'medium' &&
                <ToolBar>
                    <ToolBarSection>
                        <ClearColumnQueries dispatch={dispatch} hasColumnQuery={hasColumnQuery} />
                    </ToolBarSection>
                    <ToolBarSection>
                        <ToggleData
                            displayType={toggleDataConfig.values.TYPE_ROW}
                            toggle={toggleRows}
                            count={selectedRowsCount}
                            hasSelected={hasSelectedRows}
                            dispatch={dispatch}
                        />
                    </ToolBarSection>
                    <ToolBarSection>
                        <ToggleData
                            displayType={toggleDataConfig.values.TYPE_COLUMN}
                            toggle={toggleColumns}
                            count={selectedColumnsCount}
                            hasSelected={hasSelectedColumns}
                            dispatch={dispatch}
                        />
                    </ToolBarSection>
                </ToolBar>
                }
                <ToolBar>
                    <ToolBarSection>
                        <PageSize {...{ changePageSize, pageSize }} />
                    </ToolBarSection>
                    <ToolBarSection>
                        <Pagination pageCount={pages.length} {...{ currentPage, total, updatePagination }} />
                    </ToolBarSection>
                </ToolBar>
            </TableChrome>
            <Table
                columns={columns}
                pages={pages}
                actions={dispatch}
                {...{ currentPage, total, updatePagination, pageSize, hasColumnQuery, searchQuery, dispatch }}
            />
        </div>
    )
}

export default PowerTable;