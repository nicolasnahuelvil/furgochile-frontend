import {CircularProgress} from "@material-ui/core";
import React from "react";

const Loading = () => {

    return (
        <div align='center'>
            <CircularProgress/>
            <br/>
            Cargando..
        </div>
    )
}

export default Loading;