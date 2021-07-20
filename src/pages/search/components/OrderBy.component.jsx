import {Button, Grid, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    noSelected: {
        height: 25,
        width: 150,
        marginLeft: 10,
        border: '.5px solid',
        borderColor: '#000'
    },
    selected: {
        height: 25,
        width: 150,
        marginLeft: 10,
        color: '#fff',
        backgroundColor: '#F2E55F',
        "&:hover": {
            backgroundColor: '#b4a81c'
        },
        "&:disabled": {
            backgroundColor: theme.palette.grey
        }
    },
}));

const OrderBy = ({quantity, sortBy, setSortBy}) => {

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={2}>
                {`${quantity} furgones en total`}
            </Grid>
            <Grid item xs/>
            <Grid item xs={5} align={'right'}>
                <Typography>
                    Ordenar por:
                    <Button
                        onClick={() => setSortBy('price')}
                        className={sortBy === 'price' ? classes.selected : classes.noSelected}
                    >
                        Precio
                    </Button>
                    <Button
                        onClick={() => setSortBy('calificacion')}
                        className={sortBy === 'calificacion' ? classes.selected : classes.noSelected}
                    >
                        Calificación
                    </Button>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default OrderBy;