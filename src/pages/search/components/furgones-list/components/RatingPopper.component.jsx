import Paper from "@material-ui/core/Paper";
import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";


const RatingPopper = ({score}) => {

    const {puntuacion, puntualidad, atencion, calidadFurgon, quantityServices} = score;

    return (
        <Grid container component={Paper}
              spacing={2}
              elevation={3}
              style={{maxWidth: 300, maxHeight: 350, padding: '10%'}}
        >
            <Grid item xs={4} style={{paddingTop: '25%'}}>
                <Typography variant={'h3'} style={{fontWeight: 'bold'}}>
                    {(Math.round(puntuacion * 10) / 10).toFixed(1
                        )}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography style={{fontSize: 13}}>
                            Puntualidad
                            <Rating name="read-only" value={puntualidad} precision={.5} readOnly/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Atención
                            <Rating name="read-only" value={atencion} readOnly/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Calidad furgón
                            <Rating name="read-only" value={calidadFurgon} readOnly/>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Los valores son calculados por los últimos <b>{quantityServices} servicios contratados</b>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default RatingPopper;