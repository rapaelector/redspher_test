import React from 'react';

const operatorInput = ['x', '+', '-', '÷', '=']

const logicalOperator = ['x', '+', '-', '÷']

/**
 * this function will check if we can insert value
 * @param input
 * @returns {boolean|boolean}
 */
export const canInsert = (input, value) => {
    // can't have 2 operator succeded
    return !(isLastCharOperator(value) && lastChar(value,'=')) && !(isLastCharOperator(value) && '=' === input) && !(isLastCharOperator(value) && operatorInput.includes(input)) && !('' === value && operatorInput.includes(input) && input != "-" );
}

/**
 * check if last char is match to input
 *
 * @param input
 * @returns {boolean}
 */
export const lastChar = (value, input) => {
    return input === value.charAt(value.length-1);
}

/**
 * this funciton check if variable is operator
 * @param input
 * @returns {boolean}
 */
export const isOperator = (input) => {
    return logicalOperator.includes(input);
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
/**
 * all inputs we need in the view part
 * @type {(string|number)[]}
 */
export const inputs = ['del', 'AC', 7, 8, 9, "÷", 4, 5, 6, 'x', 1, 2, 3, '-', 0, '.', '=', '+'];
