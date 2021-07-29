import React, { useState } from 'react';
import { Grid, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import Button from "../../components/generic/Button";
import RegionSelect from "../../components/region-comuna-selects/region-select.component";
import ComunaSelect from "../../components/region-comuna-selects/comuna-select.component";
import { Helmet } from "react-helmet-async";
import ReactPlayer from 'react-player';
import homepage from '../../assets/homepage.png';


const HomePage = () => {
    const [regionSelected, setRegionSelected] = useState(null);
    const [comunaSelected, setComunaSelected] = useState(null);


    const getSearchLinkWithParams = () => {
        if (comunaSelected !== null) {
            return `/busqueda?region=${regionSelected.number}&comuna=${comunaSelected.name}`
        } else if (regionSelected !== null) {
            return `/busqueda?region=${regionSelected.number}`
        }

        return '/busqueda'
    }

    return (
        <>
            <Helmet>
                <style>{'body { background-color: #F5F6FA; }'}</style>
                <title>FurgoChile | Inicio</title>
            </Helmet>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs />
                        <Grid item>
                            <Typography variant='h2'>
                                ¡Encuentra el mejor furgón para tus hijos!
                            </Typography>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs />
                        <Grid item>
                            <Typography variant='h4'>
                                La mejor forma de encontrar furgones online
                            </Typography>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={3}>
                        <RegionSelect
                            setRegionSelected={setRegionSelected}
                            regionSelected={regionSelected}
                            style={{ width: 400 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <ComunaSelect
                            regionSelected={regionSelected}
                            setComunaSelected={setComunaSelected}
                            comunaSelected={comunaSelected}
                            style={{ width: 400 }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs />
                        <Grid item style={{ marginTop: 15, paddingRight: 50 }}>
                            <Button
                                endIcon={<SearchIcon>Buscar</SearchIcon>}
                                component={Link}
                                to={getSearchLinkWithParams}
                            >
                                Buscar
                            </Button>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{paddingTop: 100}}/>
                <Grid container  item xs={12}>
                    <Grid item xs={12} container
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="center">
                        <Typography variant='h4' style={{paddingBottom: 30}}>¿Quieres saber de que se trata este gran proyecto?</Typography>
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=i43JY9BUDwU'
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;
