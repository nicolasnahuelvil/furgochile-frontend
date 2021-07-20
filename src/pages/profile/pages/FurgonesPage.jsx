import { Grid, Typography } from "@material-ui/core";
import Button from "../../../components/generic/Button";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import { useEffect } from "react";
import { furgonesService } from "../../../services/furgones/FurgonesService";
import { useState } from "react";

const FurgonesPage = ({ user: currentUser }) => {

    const [misFurgones, setMisFurgones] = useState([]);

    const renderFurgon = ({ modelo, conductor, patente, anho, capacidad, estado, comuna, acompanante }) => (
        <Grid item xs={12}>
            <Typography>
                <b>{conductor}</b><br />
                <b>Modelo:</b> {modelo} <br />
                <b>Patente:</b> {patente} <br />
                <b>Año:</b> {anho}<br />
                <b>Capacidad:</b> {capacidad}<br />
                <b>Estado:</b> {estado}<br />
                <b>Comuna:</b> {comuna}<br />
                <b>Acompañante:</b> {acompanante}<br />
            </Typography>
        </Grid>

    )

    useEffect(() => {
        furgonesService.getMisFurgones().then(response => {
            console.log(response)
            setMisFurgones(response)
        })
    }, []);


    return (
        <Grid container>
            <Grid item xs={12} style={{ padding: 25, marginBottom: 30 }}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant='h4' align='center'>
                            Mis furgones
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            component={Link}
                            to={'/perfil/agregar-furgon'}
                            style={{ fontSize: 12 }}
                            startIcon={<AddIcon />}
                        >
                            Agregar furgon
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {misFurgones?.map(furgon => renderFurgon(furgon))}

                </Grid>
            </Grid>
        </Grid>
    )
}

export default FurgonesPage;