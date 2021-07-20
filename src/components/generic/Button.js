import React from "react";
import {Button as MButton, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    buttonStyle: {
        color: '#000',
        backgroundColor: '#F2E55F',
        "&:hover":{
            backgroundColor: '#b4a81c'
        },
        "&:disabled":{
            backgroundColor: theme.palette.grey
        }
    }
}));

const Button = ({children, ...props}) => {
    const styles = useStyles();

    return (
        <MButton
            className={styles.buttonStyle}
            variant="contained"
            {...props}
        >
            {children}
        </MButton>
    )
}

export default Button;