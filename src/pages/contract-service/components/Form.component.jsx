import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import Button from "../../../components/generic/Button";
import TextField from "../../../components/generic/TextField";
import {furgonesService} from "../../../services/furgones/FurgonesService";

const Form = ({
                  serviceData,
                  horario, setHorario,
                  horarioDeClases, setHorarioDeClases,
                  cantidadNinos, setCantidadNinos,
                  direccion, setDireccion,
                  nombre, setNombre,
                  colegio, setColegio,
                  telefonoContacto, setTelefonoContacto,
                  nextStep
              }) => {

    useEffect(() => {



    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth={true}
                            label="Horario"
                            value={serviceData?.horario || ''}
                            disabled={true}
                            onChange={(event) => setHorario(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth={true}
                            label="Horario de clase"
                            value={horarioDeClases}
                            onChange={(event) => setHorarioDeClases(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth={true}
                            type="number"
                            label="Cantidad niños"
                            value={cantidadNinos}
                            onChange={(event) => setCantidadNinos(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth={true}
                            label="Dirección"
                            value={direccion}
                            onChange={(event) => setDireccion(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth={true}
                            label="Nombre"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth={true}
                            label="Colegio"
                            value={colegio}
                            onChange={(event) => setColegio(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth={true}
                            label="Telefono de contacto"
                            type="number"
                            value={telefonoContacto}
                            onChange={(event) => setTelefonoContacto(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} align={'center'} style={{marginTop: 30}}>
                <Button onClick={nextStep}>
                    Siguiente
                </Button>
            </Grid>
        </Grid>
    )
}

export default Form;