import React, {useState} from 'react';
import '../App.css'
import { makeStyles } from '@material-ui/styles';
import {Paper, Grid, Box, TextField, FormControl, InputBase} from '@material-ui/core'
import {grey} from "@material-ui/core/colors";
import {canInsert} from "../Utils/function";

const useStyles = makeStyles({
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
    divKeyboard: {
        cursor: 'pointer',
        textAlign: 'center',
        lineHeight: '34px',
        margin: '4px',
        boxSizing: 'border-box',
        position: 'relative',
        borderRadius: '4px',
    },
    calculatorTable: {
        margin: '0 auto'
    },
    paperKeyboard: {
        padding: 30,
        background:'#f1f3f4',
        textAlign: 'center',
    },
    paper: {
        padding: 10,
        height: 100,
        textAlign: 'right',
    },

});

function CalculatorView() {
    const [value, setValue] = useState('');
    const classes = useStyles();
    const inputs = ['del', 'AC', 7, 8, 9, "÷", 4, 5, 6, 'x', 1, 2, 3, '-', 0, '.', '=', '+'];
    const xs6Inputs = ['del', 'AC'];
    const logicalInput = ['del', 'AC', '='];

    /**
     * this funciton will check if we can append the value
     * @param item
     */
    const addItemToValue = (item) => {
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
    const submit = () => {
        fetch('http://example.com/movies.json')
            .then(response => response.json())
            .then(data => console.log(data));
        console.log('submit')
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
                    break;
                case '=':
                    submit();
                    break;
                default:
                    break;
            }
        }
    }
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
                            <FormControl fullWidth>
                                <InputBase
                                    className={classes.margin}
                                    multiline
                                    maxRows={4}
                                    value={value}
                                    inputProps={{min: 0, style: { textAlign: 'right' }}}
                                />
                            </FormControl>
                        </Paper>
                    </Grid>
                    {RenderInput()}
                </Grid>
            </div>
    );
}

export default CalculatorView;
