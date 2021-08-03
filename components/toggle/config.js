export const values = Object.freeze({
    SHOW_ALL: 'SHOW_ALL',
    SHOW_SELECTED: 'SHOW_SELECTED',
    HIDE_SELECTED: 'HIDE_SELECTED',
    TYPE_ROW: 'TYPE_ROW',
    TYPE_COLUMN: 'TYPE_COLUMN',
    STRING_ROW: 'row',
    STRING_COLUMN: 'column'
})

export const getInputString = (type) => {
    if (type === values.TYPE_ROW) {
        return `${values.STRING_ROW}`
    } else if (type === values.TYPE_COLUMN) {
        return `${values.STRING_COLUMN}`
    } else {
        return '';
    }
}

export const getInputConfig = type => {
    const text = getInputString(type);
    
    return ([
        {
            value: values.SHOW_ALL,
            name: values.SHOW_ALL,
            labelTitle: `Show all ${text}s`,
            optionStyle: 'show-all',
            displayType: type,
            text
        },
        {
            value: values.SHOW_SELECTED,
            name: values.SHOW_SELECTED,
            labelTitle: `Show selected ${text}s`,
            optionStyle: 'show-selected',
            displayType: type,
            text
        },
        {
            value: values.HIDE_SELECTED,
            name: values.HIDE_SELECTED,
            labelTitle: `Hide selected ${text}s`,
            optionStyle: 'hide-selected',
            displayType: type,
            text
        },
    ])
}