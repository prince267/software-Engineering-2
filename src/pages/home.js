import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 230 ,
        marginTop:200,
        width: '100ch',
    },
}));



export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div>

                <TextField
                className={classes.textField}
                    id="outlined-full-width"
                    label="Label"
                    placeholder="Placeholder"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </div>
        </div>
    )
}