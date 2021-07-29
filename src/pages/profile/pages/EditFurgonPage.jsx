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
import countryData from "../../../data/country";

const queryString = require('query-string');

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

const EditFurgonPage = (props) => {
    const queryParams = queryString.parse(props.location.search);

    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [acompanante, setAcompanante] = useState("");
    const [anho, setAnho] = useState("");
    const [idMarca, setIdMarca] = useState(undefined);
    const [idModelo, setIdModelo] = useState(undefined);
    const [capacidad, setCapacidad] = useState("");
    const [patente, setPatente] = useState("");
    const [regionSelected, setRegionSelected] = useState(undefined);
    const [comunaSelected, setComunaSelected] = useState(undefined);
    const [idEstado, setIdEstado] = useState(undefined);
    const [selectFile, setSelectFile] = useState(undefined);
    const [msg, setMsg] = useState(undefined);
    const [msgType, setMsgType] = useState(undefined);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    const [marcas, setMarcas] = useState([]);
    const [furgonData, setFurgonData] = useState({});


    const handleSetFurgonData = (f) => {
        setAcompanante(f.acompanante)
        setAnho(f.furgon.anho)
        setCapacidad(f.furgon.capacidad)
        setPatente(f.furgon.patente)
        setIdEstado(f.furgon.idEstado)
        setIdMarca(f.furgon.idMarca)
        setIdModelo(f.furgon.idModelo)

        const preRegion = countryData.find(r => r.number === f.location.regionId)
        setRegionSelected(preRegion)

        const preComuna = preRegion.communes.find(c => c.id === f.location.comunaId)
        setComunaSelected(preComuna)
    }


    useEffect(() => {
        marcasService.getAll()
            .then(response => {
                console.log(response)
                setMarcas(response)
            })

        furgonesService.getById(queryParams.idFurgon)
            .then(response => {
                setFurgonData(response)
                handleSetFurgonData(response)
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

    const handleAdd = () => {
        console.log(JSON.stringify({idFurgon: queryParams.idFurgon, acompanante, anho, idMarca, idModelo, capacidad, patente, idRegion: regionSelected.id, idComuna: comunaSelected.id, idEstado, selectFile}))
        furgonesService.edit(queryParams.idFurgon, acompanante, anho, idMarca, idModelo, capacidad, patente, regionSelected.id, comunaSelected.id, idEstado, selectFile)
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

    

    const handleUploadImageClick = async event => {

        const reader = new FileReader();

        reader.onload = (event) => {
            setSelectFile((event.target.result))
        };

        reader.onerror = (err) => {
            console.error(err);
        };

        reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12} style={{ padding: 25 }}>
                    <Typography variant='h4' align='center'>Editar furgon</Typography>
                    <Typography align='center' style={{ paddingTop: 10 }}>
                       En este apartado puedes realizar cambios en la información de tu furgon.
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
                                    <TextField id="outlined-basic" label="Acompañante" variant="outlined"
                                        value={acompanante}
                                        onChange={(event) => setAcompanante(event.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Año" variant="outlined"
                                        value={anho}
                                        onChange={(event) => setAnho(event.target.value)} />
                                </Grid>
                                

                                <Grid item xs={12}>
                                    <FormControl variant="outlined">
                                        <InputLabel>Marca</InputLabel>
                                        <Select
                                            key={idMarca}
                                            label="Marca"
                                            id="idMarca"
                                            fullWidth
                                            style={{ width: 210 }}
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
                                            key={idModelo}
                                            label="Modelo"
                                            id="idModelo"
                                            fullWidth
                                            style={{ width: 210 }}
                                            value={idModelo}
                                            onChange={event => setIdModelo(event.target.value)}>
                                            {
                                                getModelosSelect()
                                            }

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
                                    <TextField id="patente" label="Patente" variant="outlined"
                                        value={patente}
                                        onChange={(event) => setPatente(event.target.value)} />
                                </Grid>

                                <Grid item xs={6}>
                                    <RegionSelect style={{ width: 210 }} regionSelected={regionSelected} setRegionSelected={setRegionSelected} />
                                    <ComunaSelect style={{ width: 210 }} regionSelected={regionSelected} comunaSelected={comunaSelected} setComunaSelected={setComunaSelected} />
                                </Grid>
                                <Grid item xs={12}>
                                <FormControl variant="outlined">
                                    <InputLabel>Estado</InputLabel>
                                    <Select
                                        key={idEstado}
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
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button onClick={handleAdd} disabled={msgType === "success"}>
                                        Editar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                                              
                <Grid item xs={12} spacing={2}>
                    <Typography
                    style={{paddingTop: 20}}
                    >Foto del furgon</Typography>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleUploadImageClick}
                    />
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
                        <h2 id="modal-title">Editaste el furgon!</h2>
                        <p id="modal-description">Dentro de los siguientes dias se confirmara o rechazara tu
                            verificación vía correo électronico, si es confirmada tu cuenta cambiara a dueño de furgon y
                            podras agregar tus vehiculos.</p>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default EditFurgonPage;