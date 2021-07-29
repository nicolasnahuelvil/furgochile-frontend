import { Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import Button from "../../../components/generic/Button";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import { useEffect } from "react";
import { furgonesService } from "../../../services/furgones/FurgonesService";
import { useState } from "react";
import { servicesService } from "../../../services/services/ServicesService";

const ServicesFurgonesPage = ({ user: currentUser }) => {

    const [misFurgones, setMisFurgones] = useState([]);

    const renderFurgon = ({ capacidad, capacidadActual, furgon, tipoHorario, tipoServicio, valor }) => (
        <Grid item xs={12}>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <b>{furgon}</b><br />
                    </Typography>
                    <Typography>
                        <br />
                        <b>Capacidad disponible:</b> {capacidadActual} <br />
                        <b>Capacidad máxima:</b> {capacidad} <br />
                        <b>Horario:</b> {tipoHorario}<br />
                        <b>Tipo servicio:</b> {tipoServicio}<br />
                        <b>Valor:</b> ${valor}<br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Editar</Button>
                </CardActions>
            </Card>

        </Grid>

    )

    useEffect(() => {
        furgonesService.getMisServicios()
            .then(response => {
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
                            Servicios
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            component={Link}
                            to={'/perfil/servicio-furgon'}
                            style={{ fontSize: 12 }}
                            startIcon={<AddIcon />}
                        >
                            Agregar servicio
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

export default ServicesFurgonesPage;