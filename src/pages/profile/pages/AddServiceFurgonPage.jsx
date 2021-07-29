import { Fade, Grid, InputLabel, makeStyles, MenuItem, Modal, Select, Typography } from "@material-ui/core";
import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import { FormControl } from "@material-ui/core";
import Button from "../../../components/generic/Button";
import { useEffect } from "react";
import { marcasService } from "../../../services/marcas/MarcasService";
import RegionSelect from "../../../components/region-comuna-selects/region-select.component";
import ComunaSelect from "../../../components/region-comuna-selects/comuna-select.component";
import { furgonesService } from "../../../services/furgones/FurgonesService";
import Alert from "@material-ui/lab/Alert";
import { lightGreen } from "@material-ui/core/colors";
import { servicesService } from "../../../services/services/ServicesService";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxWidth: '30%'
    },
}));

const AddServiceFurgonPage = () => {
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idFurgon, setIdFurgon] = useState(undefined);
    const [idHorario, setIdHorario] = useState(undefined);
    const [idTipoServicio, setIdTipoServicio] = useState(undefined);
    const [idSexo, setIdSexo] = useState(undefined);
    const [capacidad, setCapacidad] = useState(undefined);;
    const [valorServicio, setValorServicio] = useState(undefined);
    const [msg, setMsg] = useState(undefined);
    const [msgType, setMsgType] = useState(undefined);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const [furgones, setFurgones] = useState([]);

    useEffect(() => {

        furgonesService.getMisFurgones()
            .then(response => {
                console.log(response)
                setFurgones(response)
            })

    }, [])




    const handleAdd = () => {
        console.log(JSON.stringify({idFurgon, idHorario, idTipoServicio, idSexo, capacidad, valorServicio  }))
        servicesService.add(idFurgon, idHorario, idTipoServicio, idSexo, capacidad, valorServicio )
            .then(response => {
                console.log(response)
                setMsgType("success")
                setMsg(response.details[0])
            })
            .catch(error => {
                console.log(error)
                setMsg(error);
                setMsgType("error");
            });
    }



    return (
        <>
            <Grid container>
                <Grid item xs={12} style={{ padding: 25 }}>
                    <Typography variant='h4' align='center'>Agregar nuevo servicio</Typography>
                    <Typography align='center' style={{ paddingTop: 10 }}>
                        Verificar es nuestro apartado para registrarte como dueño de un furgon y hacer promoción del
                        mismo.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    {msg &&
                        <Alert severity={msgType} style={{ marginTop: 20, marginBottom: 20 }}>{msg}</Alert>
                    }
                </Grid>

                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                    <FormControl variant="outlined">
                                        <InputLabel>Furgon</InputLabel>
                                        <Select
                                            label="Furgon"
                                            id="idFurgon"
                                            fullWidth
                                            style={{ width: 210 }}
                                            value={idFurgon}
                                            onChange={event => setIdFurgon(event.target.value)}
                                        >
                                            {furgones.map((furgon) => (
                                                <MenuItem value={furgon.id}>{furgon.modelo} - {furgon.patente}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormControl variant="outlined">
                                        <InputLabel>Horario</InputLabel>
                                        <Select
                                            label="Horario"
                                            id="idHorario"
                                            fullWidth
                                            style={{ width: 210 }}
                                            value={idHorario}
                                            onChange={event => setIdHorario(event.target.value)}>
                                            <MenuItem value={1}>Mañana</MenuItem>
                                            <MenuItem value={2}>Tarde</MenuItem>
                                            <MenuItem value={3}>Mañana y Tarde</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined">
                                        <InputLabel>Sexo conductor</InputLabel>
                                        <Select
                                            label="Sexo"
                                            id="idSexo"
                                            fullWidth
                                            style={{ width: 210 }}
                                            value={idSexo}
                                            onChange={event => setIdSexo(event.target.value)}>
                                            <MenuItem value={1}>Hombre</MenuItem>
                                            <MenuItem value={2}>Mujer</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined">
                                        <InputLabel>Tipo de servicio</InputLabel>
                                        <Select
                                            label="Tipo de servicio"
                                            id="idServicio"
                                            fullWidth
                                            style={{ width: 210 }}
                                            value={idTipoServicio}
                                            onChange={event => setIdTipoServicio(event.target.value)}>
                                            <MenuItem value={1}>Bus urbano</MenuItem>
                                            <MenuItem value={2}>Bus rural</MenuItem>
                                            <MenuItem value={3}>Mini bus urbano</MenuItem>
                                            <MenuItem value={4}>Mini bus rural</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Capacidad" variant="outlined"
                                        value={capacidad}
                                        onChange={(event) => setCapacidad(event.target.value)} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField id="valorServicio" label="Valor del servicio" variant="outlined"
                                        value={valorServicio}
                                        onChange={(event) => setValorServicio(event.target.value)} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button onClick={handleAdd} disabled={msgType === "success"}>
                                        Agregar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography style={{ fontSize: 13, paddingTop: 20 }}>
                        Este formulario es para registrar sus furgones
                    </Typography>
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={isModalOpen}
                onClose={toggleModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpen}>
                    <div className={classes.paper}>
                        <h2 id="modal-title">Agregaste un nuevo furgon!</h2>
                        <p id="modal-description">Dentro de los siguientes dias se confirmara o rechazara tu
                            verificación vía correo électronico, si es confirmada tu cuenta cambiara a dueño de furgon y
                            podras agregar tus vehiculos.</p>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default AddServiceFurgonPage;