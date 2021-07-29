import { Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import Button from "../../../components/generic/Button";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import { useEffect } from "react";
import { furgonesService } from "../../../services/furgones/FurgonesService";
import { useState } from "react";
import { servicesService } from "../../../services/services/ServicesService";

const EnableProfilePage = ({ user: currentUser }) => {

    const [conductores, setConductores] = useState([]);

    const renderFurgon = ({ id, nombre, imgCarnetFrontal, imgCarnetTrasero, imgLicenciaFrontal, imgLicenciaTrasero }) => (
        <Grid item xs={12}>
            <Card variant="outlined">
                        <CardContent>
                            <Typography  color="Primary" gutterBottom>
                                <b>{nombre}</b>
                            </Typography>
                            <Typography variant="body2" displayInline>
                                <img 
                                style={{width:150, height:150}}
                                src={imgCarnetFrontal}>  
                                </img>
                                <img
                                style={{width:300, height:150, paddingLeft: 20}}
                                src={imgCarnetTrasero}>     
                                </img>
                                <img
                                style={{width:300, height:150, paddingLeft: 20}}
                                src={imgLicenciaFrontal}>     
                                </img>
                                <img
                                style={{width:300, height:150, paddingLeft: 20}}
                                src={imgLicenciaTrasero}>     
                                </img>
                            </Typography>
                            <Typography variant="h5" component="h2">
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {handleAprobar(id)}}>Aceptar</Button>
                            <Button size="small" onClick={() => {handleRechazar(id)}}>Rechazar</Button>
                        </CardActions>
                    </Card>
        </Grid>

    )

    const handleAprobar = (id) => {
        servicesService.aprobarConductor(id)
        .then(response => {
            console.log(response)
            getData()
        }) 
    }

    const handleRechazar = (id) => {
        servicesService.rechazarConductor(id)
        .then(response => {
            console.log(response)
            getData()
        }) 
    }

    const getData = () => {
        servicesService.obtenerConductoresPendientes()
        .then(response => {
            console.log(response)
            setConductores(response)
        })
    }

    useEffect(() => {
        servicesService.obtenerConductoresPendientes()
        .then(response => {
            console.log(response)
            setConductores(response)
        })
    }, []);


    return (
        <Grid container>
            <Grid item xs={12} style={{ padding: 25, marginBottom: 30 }}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant='h4' align='center'>
                            Verificación de conductores
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {conductores?.map(furgon => renderFurgon(furgon))}
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default EnableProfilePage;