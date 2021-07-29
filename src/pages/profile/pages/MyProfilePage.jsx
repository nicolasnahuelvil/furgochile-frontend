import { CardMedia, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from "react-router-dom";
import { myPerfilServices } from "../../../services/mi-perfil/MiPerfilService";

const MyProfilePage = ({ perfilInfo }) => {

    return (
        <Grid container>

            <Grid item xs={12} style={{ padding: 25, marginBottom: 30 }}>
                <Typography variant='h4' align='center'>
                    Bienvenido, {`${perfilInfo?.nombre} ${perfilInfo?.apellidos}`}
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            <b>Nombres:</b> {perfilInfo.nombre}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            <b>Apellidos:</b> {perfilInfo.apellidos}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            <b>Edad:</b> {perfilInfo.edad}
                        </Typography>
                    </Grid>

                </Grid>

            </Grid>

            <Grid item xs={4} spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            <b>RUT:</b> {perfilInfo.rut}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            <b>Email:</b> {perfilInfo.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            <b>Telefono:</b> {perfilInfo.telefono}
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={2} spacing={2}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>
                            <b>Tipo cuenta:</b>
                            <br />
                            {perfilInfo.tipoCuenta}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid xs={3}>
                    <CardMedia style={{paddingTop: 35}}
                        component="img"
                        alt="Furgon escolar"
                        height="200"
                        width="300"
                        image="https://www.nissan-cdn.net/content/dam/Nissan/cl/vehicles/nv350escolar/FINAL%20NV350.jpg.ximg.l_12_m.smart.jpg"
                        title="Furgon escolar"
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} style={{ marginTop: 50 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} align={'right'}>
                        <IconButton
                            color="primary"
                            component={Link}
                            to={'/perfil/editar'}
                        >
                            <SettingsIcon style={{ color: '#F2E55F' }} fontSize={'large'} />
                            {/*Editar perfil*/}
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default MyProfilePage;