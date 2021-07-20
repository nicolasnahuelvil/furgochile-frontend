import {Fade, Grid, makeStyles, Modal, Typography} from "@material-ui/core";
import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Button from "../../../components/generic/Button";

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

const VerifyPage = () => {
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} style={{padding: 25}}>
                    <Typography variant='h4' align='center'>Verificar</Typography>
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
                                    <TextField id="outlined-basic" label="RUT" variant="outlined"/>
                                    <br/>
                                    Ejemplo: 77888999-0
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Nombre" variant="outlined"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Apellido paterno" variant="outlined"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Apellido materno" variant="outlined"/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={5}>
                            <Grid container>
                                <Grid item xs={6} style={{paddingBottom: 50}}>
                                    <TextField id="outlined-basic" label="Numero de licencia" variant="outlined"/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button onClick={toggleModal}>
                                        Verificar
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

export default VerifyPage;