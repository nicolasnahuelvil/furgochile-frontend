import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {Link} from "react-router-dom";
import Button from "../../components/generic/Button";
import RegionSelect from "../../components/region-comuna-selects/region-select.component";
import ComunaSelect from "../../components/region-comuna-selects/comuna-select.component";
import {Helmet} from "react-helmet-async";


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
                <title>FurgoChile | Inicio</title>
            </Helmet>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs/>
                        <Grid item>
                            <Typography variant='h2'>
                                ¡Encuentra el mejor furgón para tus hijos!
                            </Typography>
                        </Grid>
                        <Grid item xs/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs/>
                        <Grid item>
                            <Typography variant='h4'>
                                La mejor forma de encontrar furgones online
                            </Typography>
                        </Grid>
                        <Grid item xs/>
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
                            style={{width: 400}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <ComunaSelect
                            regionSelected={regionSelected}
                            setComunaSelected={setComunaSelected}
                            comunaSelected={comunaSelected}
                            style={{width: 400}}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs/>
                        <Grid item style={{marginTop: 15}}>
                            <Button
                                endIcon={<SearchIcon>Buscar</SearchIcon>}
                                component={Link}
                                to={getSearchLinkWithParams}
                            >
                                Buscar
                            </Button>
                        </Grid>
                        <Grid item xs/>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{marginTop: '20%'}}>
                    <Grid container>
                        <Grid item xs/>
                        <Grid item>
                        </Grid>
                        <Grid item xs/>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;
