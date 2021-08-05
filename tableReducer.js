import { v4 as uuid } from 'uuid';
import { useRef } from 'react';

export const actions = Object.freeze({
    SELECT_ROW: 'SELECT_ROW',
    CLEAR_SELECTED_ROWS: 'CLEAR_SELECTED_ROWS',
    SELECT_COLUMN: 'SELECT_COLUMN',
    CLEAR_SELECTED_COLUMNS: 'CLEAR_SELECTED_COLUMNS',
    COLUMN_QUERY: 'COLUMN_QUERY',
    CLEAR_COLUMN_QUERYS: 'CLEAR_COLUMN_QUERYS',
})

export const headingFormat = text => text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())


export const formatData = data => {
    let columns = [], rows = [];
    
    data.forEach(row => {
        for (let heading of Object.keys(row)) {
            if (!columns.find(h => h.heading.value == heading)) {

                columns.push({
                    id: uuid(),
                    heading: {
                        value: heading,
                        display: headingFormat(heading)
                    },
                    selected: false,
                    query: ''
                })
            }
        }

        rows.push({
            id: uuid(),
            data: row,
            selected: false,
        })

    })

    return {
        id: uuid(),
        rows,
        columns
    }
}

export const tableReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case actions.SELECT_ROW:
            return ({
                ...state,
                rows: state.rows.map(row => {
                    if (payload == row.id) row.selected = !row.selected
                    return row
                })
            })

        case actions.CLEAR_SELECTED_ROWS:
            return ({
                ...state,
                rows: state.rows.map(row => {
                    row.selected = false
                    return row
                })
            })

        case actions.SELECT_COLUMN:
            return ({
                ...state,
                columns: state.columns.map(column => {
                    if (payload == column.id) column.selected = !column.selected;
                    return column
                })
            })

        case actions.CLEAR_SELECTED_COLUMNS:
            return ({
                ...state,
                columns: state.columns.map(column => {
                    column.selected = false
                    return column
                })
            })

        case actions.COLUMN_QUERY:
            return ({
                ...state,
                columns: state.columns.map(column => {
                    if (payload.id == column.id) {
                        column.query = payload.query
                    }
                    return column
                })
            })

        case actions.CLEAR_COLUMN_QUERYS:
            return ({
                ...state,
                columns: state.columns.map(column => {
                    column.query = ''
                    return column
                })
            })

        default:
            return state;
    }
}