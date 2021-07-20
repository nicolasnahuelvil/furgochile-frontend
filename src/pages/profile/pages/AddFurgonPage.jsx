import {Fade, Grid, InputLabel, makeStyles, MenuItem, Modal, Select, Typography} from "@material-ui/core";
import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import {FormControl} from "@material-ui/core";
import Button from "../../../components/generic/Button";
import { useEffect } from "react";
import {marcasService} from "../../../services/marcas/MarcasService";
import RegionSelect from "../../../components/region-comuna-selects/region-select.component";
import ComunaSelect from "../../../components/region-comuna-selects/comuna-select.component";

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

const AddFurgonPage = () => {
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idEstado, setIdEstado] = useState(undefined);
    const [idModelo, setIdModelo] = useState(undefined);
    const [idMarca, setIdMarca] = useState(undefined);
    const [comunaSelected, setComunaSelected] = useState(undefined);
    const [regionSelected, setRegionSelected] = useState(undefined);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const [marcas, setMarcas] = useState([]);

    useEffect(() => {

        marcasService.getAll()
        .then(response => {
            console.log(response)
            setMarcas(response)
        })

    }, [])

    const handleSetIdMarca = (id) => {
        setIdMarca(id);
        setIdModelo(undefined);
    } 

    const getModelosSelect = () => {
        if (idMarca === undefined) {
            return <MenuItem value={-1}>Debes seleccionar una marca.</MenuItem>
        }

        return marcas.find(marca => marca.id === idMarca).modelos.map((modelo, index) => (
            <MenuItem value={modelo.id}>{modelo.nombre}</MenuItem>
        ))
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} style={{padding: 25}}>
                    <Typography variant='h4' align='center'>Agregar nuevo furgon</Typography>
                    <Typography align='center' style={{paddingTop: 10}}>
                        Verificar es nuestro apartado para registrarte como dueño de un furgon y hacer promoción del
                        mismo.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Acompañante" variant="outlined"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Año" variant="outlined"/>
                                </Grid>

                                <Grid item xs={12}>
                                <FormControl variant="outlined">
                                    <InputLabel>Estado</InputLabel>
                                    <Select
                                        label="Estado"
                                        id="idEstado"
                                        fullWidth
                                        style={{width: 210}}
                                        value={idEstado}
                                        onChange={event => setIdEstado(event.target.value)}
                                    >
                                        <MenuItem value={1}>Disponible</MenuItem>
                                        <MenuItem value={2}>No disponible</MenuItem>
                                    </Select>
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <RegionSelect style={{width: 210}} regionSelected={regionSelected} setRegionSelected={setRegionSelected} />
                            </Grid>
                            
                            <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Capacidad" variant="outlined"/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <FormControl variant="outlined">
                                    <InputLabel>Marca</InputLabel>
                                    <Select
                                        label="Marca"
                                        id="idMarca"
                                        fullWidth
                                        style={{width: 210}}
                                        value={idMarca}
                                        onChange={event => handleSetIdMarca(event.target.value)}
                                    >
                                        {marcas.map((marca) => (
                                            <MenuItem value={marca.id}>{marca.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                <FormControl variant="outlined">
                                    <InputLabel>Modelo</InputLabel>
                                    <Select
                                        label="Modelo"
                                        id="idModelo"
                                        fullWidth
                                        style={{width: 210}}
                                        value={idModelo}
                                        onChange={event => setIdModelo(event.target.value)}
                                    >
                                        {
                                            getModelosSelect()
                                        }
                                        
                                    </Select>
                                </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Patente" variant="outlined"/>
                                </Grid>

                                <Grid item xs={6}>
                                <ComunaSelect  style={{width: 210}} regionSelected={regionSelected} comunaSelected={comunaSelected} setComunaSelected={setComunaSelected}/>
                            </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button onClick={toggleModal}>
                                        Agregar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography style={{fontSize: 13, paddingTop: 20}}>
                        Este formulario es para Consulta inhabilidades para trabajar con menores de edad ademas de
                        comprobar si se encuentra su licencia vigente A1 o A3.
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
                        <h2 id="modal-title">Gracias por realizar la verificación de usuario!</h2>
                        <p id="modal-description">Dentro de los siguientes dias se confirmara o rechazara tu
                            verificación vía correo électronico, si es confirmada tu cuenta cambiara a dueño de furgon y
                            podras agregar tus vehiculos.</p>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default AddFurgonPage;