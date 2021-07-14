import React from "react";
import {Fade, Paper, Popper, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import {reinitResult} from "../features/calculator/calculatorSlice";


const useStyles = makeStyles( {
    typography: {
        padding: 10,
    },
    historyValue: {
        padding: 4,
        background:'#f1f3f4',
        textAlign: 'center',
    },
    paper: {
        padding: 10,
        height: 100,
        textAlign: 'left',
    },
    pointer: {
        cursor: 'pointer'
    }

});

const History = (props) => {
    const history = useSelector(store => store.calculator.history)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const classes = useStyles();
    const {setValue} = props;
    const dispatch = useDispatch();

    const handleClick = newPlacement => event => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    /**
     * this funciton will call when click in the history and select again the input already calculated
     * @param item
     */
    const reviewHistory = (item) => {
        setValue(item.target.outerText);
        dispatch(reinitResult())
    }
    return (
        <>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>

                            {history.length ? history.map((item, i) => (
                                    <Typography key={i} className={classes.typography}>
                                        <span onClick={reviewHistory} className={`${classes.historyValue} ${classes.pointer}`}>{item.input}</span> = <span className={classes.historyValue}>{item.result} </span>
                                    </Typography>
                                )) :
                                (<Typography className={classes.typography}>
                                    No History yet !
                                </Typography>)
                            }
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <IconButton color="secondary" className={classes.button} aria-label="History" onClick={handleClick('top-start')}>
                <AccessTimeIcon />
            </IconButton>
        </>
    )
}

export default History;