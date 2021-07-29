import {Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../../../components/generic/Button";
import { servicesService } from "../../../services/services/ServicesService";

const ServicesPage = ({ user: currentUser }) => {

    

    const renderService = ({ comuna, nombre, precio, horario }) => (
        <Grid item xs={4}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <b>{comuna}</b><br />
                    </Typography>
                    <Typography style={{paddingTop: 20}} >
                        <b>Nombre:</b> {nombre} <br />
                        <b>Precio:</b> ${precio} <br />
                        <b>Horario:</b> {horario}<br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button>Pagar</Button>
                </CardActions>
            </Card>
        </Grid>
    )

    const [misServicios, setMisServicios] = useState([]);

    useEffect(() => {

        servicesService.getMisServicios().then(response => {
            console.log(response)
            setMisServicios(response)
        })

    }, [])


    return (
        <Grid container>

            <Grid item xs={12} style={{ padding: 25, marginBottom: 30 }}>
                <Typography variant='h4' align='center'>
                    Servicios contratados
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {misServicios.map(service => renderService(service))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ServicesPage;