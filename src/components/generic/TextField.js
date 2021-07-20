import React from "react";
import {TextField as MTextField, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    textFieldStyle: {
        borderColor: '#F2E55F'
    }
}));



const TextField = ({children, ...props}) => {
    const styles = useStyles();

    return (
        <MTextField
            className={styles.textFieldStyle}
            variant="outlined"
            {...props}
        >
            {children}
        </MTextField>
    )
}

export default TextField;