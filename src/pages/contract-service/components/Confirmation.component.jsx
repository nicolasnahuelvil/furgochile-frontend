import {Grid, Typography} from "@material-ui/core";
import React from "react";
import StringUtils from "../../../utils/StringUtils";
import CircularCheckbox from "../../../components/generic/CircularCheckbox";
import Button from "../../../components/generic/Button";

const Confirmation = ({personalInfo, receiveEmails, setReceiveEmails, handleFinish, disableBtn, loading}) => {


    return (
        <Grid container spacing={2}>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Typography>
                    Se a confirmado el pago, puedes ponerte en contacto telefonico
                    a {StringUtils.capitalizeFirstLetter(personalInfo.nombre)} {personalInfo.telefono} o via correo
                    electronico {personalInfo.correo}
                </Typography>
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Typography>
                    Igualmente puedes esperar y {StringUtils.capitalizeFirstLetter(personalInfo.nombre)} se contactara
                    contigo para confirmar su servicio.
                </Typography>
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Typography>
                    Estaria finalizando solo debes esperar que vayan por tus hijos en el horario que mencionaste!
                </Typography>
            </Grid>
            <Grid item xs={3}/>

            <Grid item xs={12} align={'center'} style={{marginTop: 40}}>
                <CircularCheckbox
                    value={receiveEmails}
                    onChange={(event) => setReceiveEmails(event.target.checked)}
                    filled={true}
                    label={'Recibir correos de ofertas de otros furgones escolares'}
                />
            </Grid>

            <Grid item xs={12} align={'center'}>
                <Button onClick={handleFinish} disabled={disableBtn}>
                    {loading ? "Cargando.." : "Finalizar"}
                </Button>
            </Grid>

            <Grid item xs={12} align={'center'}>
                <Typography>
                    Puedes descargar el comprobante desde tu historial
                </Typography>
            </Grid>

        </Grid>
    )
}

export default Confirmation;