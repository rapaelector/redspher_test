import React from "react";
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {client} from "../../api/client";

const initialState = {
    history:[],
    loading: false,
    status: '',
    error: '',
    result: null
}


export const fetchCalculate = createAsyncThunk('post/fetchCalculate', async (input) => {
    const result = await client.post('/api/calculate', {input : input.replace('=', '')});
    return {input, result: result.result}
})

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        addHistoryCalculator(state, action) {
            state.history.push(action.payload)
        },
        triggerLoading(state, action) {
            state.loading = !state.loading;
        },
        reinitResult(state, action) {
            state.result = null
        }
    },
    extraReducers: {
        [fetchCalculate.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchCalculate.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            const {input, result} = action.payload;
            state.history.push({input, result});
            state.result=action.payload.result;
        },
        [fetchCalculate.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { addHistoryCalculator, triggerLoading, reinitResult } = calculatorSlice.actions

export default calculatorSlice.reducer