import {Typography} from "@material-ui/core";
import Button from "../../components/generic/Button";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import React from "react";

const NotFoundPage = () => {

    return (
        <>

            <Helmet>
                <title>FurgoChile | Pagina no encontrada</title>
            </Helmet>

            <Typography variant={'h1'}>
                Error
            </Typography>
            <br/>
            <Typography variant={'h4'}>
                Lo que buscas no se encontro
            </Typography>
            <br/>
            <Button component={Link} to='/'>
                Ir a inicio
            </Button>

        </>
    )
}

export default NotFoundPage;