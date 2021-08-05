import React, { createContext } from 'react';
import cssVariables from './scss/variables.scss'

const getMinWidth= value => `(min-width: ${value})`
const getMaxWidth = value => `(max-width: ${value})`

export const breakpoints = {
    medium: {
        value: cssVariables.mediaMid,
        const: 'MEDIUM'
    }
}

export const mediaQueryList = {
    medium: {
        value: getMinWidth(breakpoints.medium.value)
    }
}

// WIP
export const MediaContext = createContext();

