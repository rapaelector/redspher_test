import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {Paper, Grid, Box, FormControl, InputBase, Typography} from '@material-ui/core'
import {canInsert, isOperator, inputs} from "../Utils/function";
import {useDispatch, useSelector} from "react-redux";
import {fetchCalculate, reinitResult} from "../features/calculator/calculatorSlice";
import History from "./History";

const useStyles = makeStyles( {
    root: {
        flexGrow: 1,
        maxWidth: 500,
        margin: 'auto'
    },
    keyboard: {
        background: '#f1f3f4',
        color: '#202124',
        border: '1px solid #f1f3f4',
        borderRadius: 4,
        lineHeight: '26px',
        cursor: 'pointer',
        fontFamily: 'arial,sans-serif',
        textAlign: 'center',
        borderCollapse: 'collapse',
        height:'2em',
    },
    paperKeyboard: {
        padding: 30,
        background:'#f1f3f4',
        textAlign: 'center',
    },
    paper: {
        padding: 10,
        height: 100,
        textAlign: 'left',
    },
    alignRight: {
        textAlign: 'right'
    }

});

function CalculatorView() {
    const [value, setValue] = useState('');
    const classes = useStyles();
    const xs6Inputs = ['del', 'AC'];
    const logicalInput = ['del', 'AC', '='];
    const dispatch = useDispatch();
    const result = useSelector(store => store.calculator.result)

    /**
     * this will reinit the result
     */
    const dispatchReinitResult = () => {
        dispatch(reinitResult())
    }

    /**
     * this funciton will check if we can append the value
     * @param item
     */
    const addItemToValue = (item) => {
        if (result) {
            if (isOperator(item.target.outerText)) {
                setValue(''+result+item.target.outerText);
                dispatchReinitResult();
            } else if('=' != item.target.outerText) {
                    setValue(item.target.outerText)
                dispatchReinitResult();
            }

        }
        if (item.target && item.target.outerText) {
            if (
                canInsert(item.target.outerText, value)
            ) {
                setValue(value + ''+ item.target.outerText);
            }
        }
    }

    /**
     * this function is responsible of submit and handle data
     */
    const submitValue = async (item) => {
        await dispatch(fetchCalculate(value.replace('=', '')));
        addItemToValue(item);
    }
    /**
     * this is responsible of logical part
     * @param item
     */
    const logicalTreatmentValue = (item) => {
        if (item.target && item.target.outerText) {
            switch(item.target.outerText) {
                case 'del':
                    setValue(value.slice(0, -1));
                    break;
                case 'AC':
                    setValue('');
                    dispatch(reinitResult());
                    break;
                case '=':
                    submitValue(item);
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * this will render the input of calculator
     * @returns {*[]}
     * @constructor
     */
    const RenderInput = () => (inputs.map( (item, i) => (
        <Grid item xs={ xs6Inputs.includes(item) ? 6 : 3 } key={i}>
            <Box onClick={logicalInput.includes(item) ? logicalTreatmentValue : addItemToValue } className={classes.paperKeyboard}>
                <div className={classes.keyboard}>
                    {item}
                </div>
            </Box>
        </Grid>
    )))

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={3}>
                        <History setValue={setValue} />
                        <Typography className={classes.alignRight}>
                            <FormControl fullWidth>
                                <InputBase className={classes.margin} multiline maxRows={4}
                                    value={value} inputProps={{min: 0, style: { textAlign: 'right' }}}
                                />
                            </FormControl>
                            {result}
                        </Typography>
                    </Paper>
                </Grid>
                {RenderInput()}
            </Grid>
        </div>
    );
}

export default CalculatorView;
