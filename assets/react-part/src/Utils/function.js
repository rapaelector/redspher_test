import React from 'react';

const operatorInput = ['x', '+', '-', '÷']

/**
 * this function will check if we can insert value
 * @param input
 * @returns {boolean|boolean}
 */
export const canInsert = (input, value) => {
    // can't have 2 operator succeded
    return !(isLastCharOperator(value) && operatorInput.includes(input)) && !('' === value && operatorInput.includes(input) && input != "-" );
}

/**
 * check if the last character is already an operator
 *
 * @returns {boolean}
 */
export const isLastCharOperator = (value) => {
    if (value.length <= 0) {
        return false;
    }
    let lastChar = value.charAt(value.length-1);
    return operatorInput.includes(lastChar);
}
