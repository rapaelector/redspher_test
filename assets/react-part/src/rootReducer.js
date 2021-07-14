import { combineReducers } from 'redux'

import calculatorReducer from './features/calculator/calculatorSlice'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    calculator: calculatorReducer,
})

export default rootReducer