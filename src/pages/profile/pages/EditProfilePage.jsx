import {Fade, Grid, makeStyles, Modal, TextField, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {Link} from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "../../../components/generic/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import {authenticationService} from "../../../services";
import Alert from "@material-ui/lab/Alert";

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

const EditProfilePage = ({perfilInfo}) => {
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [message, setErrorMessage] = useState(undefined);
    const [messageType, setMessageType] = useState(undefined);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const formik = useFormik({
        initialValues: {
            nombres: perfilInfo.nombre,
            apellidos: perfilInfo.apellidos,
            edad: perfilInfo.edad,
            rut: perfilInfo.rut,
            email: perfilInfo.email,
            telefono: perfilInfo.telefono,
        },
        validationSchema:
            Yup.object().shape({
                nombres: Yup.string().required('Debes ingresar tu/s nombre/s.'),
                apellidos: Yup.string().required('Debes ingresar tu/s apellido/s.'),
                email: Yup.string().email("Debes ingresar un email valido").required('Debes ingresar tu email.'),
                telefono: Yup.number().typeError('Tu telefono debe ser solo numeros').required('Debes ingresar tu celular.').positive().integer()
            }),
        onSubmit({nombres, apellidos, edad, telefono}, {setErrors, setSubmitting}) {
            console.log("ON SUBMITING")

            authenticationService.edit(nombres, apellidos, edad, telefono)
                .then(response => {
                    console.log(response)
                    setSubmitting(false);
                    setMessageType("success")
                    setErrorMessage(response.details[0])
                })
                .catch(error => {
                    console.log(error)
                    setSubmitting(false);
                    setErrorMessage(error);
                    setMessageType("error");
                });
        }
    });

    return (
        <>
        <form className={classes.form} onSubmit={formik.handleSubmit} noValidate autoComplete={false}>
            <Grid container>

                <Grid item xs={12} style={{padding: 25, marginBottom: 30}}>
                    <Typography variant='h4' align='center'>
                        Configurar usuario
                    </Typography>
                </Grid>

                <Grid item xs={12} style={{marginBottom: 30}}>
                    {   message &&
                    <Alert severity={messageType}>{message}</Alert>
                    }
                </Grid>


                <Grid item xs={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombres"
                                variant="outlined"
                                id="nombres"
                                value={formik.values.nombres}
                                onChange={formik.handleChange}
                                error={formik.touched.nombres && formik.errors.nombres}
                                helperText={formik.touched.nombres && formik.errors.nombres}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Apellidos"
                                variant="outlined"
                                id="apellidos"
                                value={formik.values.apellidos}
                                onChange={formik.handleChange}
                                error={formik.touched.apellidos && formik.errors.apellidos}
                                helperText={formik.touched.apellidos && formik.errors.apellidos}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Edad"
                                variant="outlined"
                                id="edad"
                                value={formik.values.edad}
                                onChange={formik.handleChange}
                                error={formik.touched.edad && formik.errors.edad}
                                helperText={formik.touched.edad && formik.errors.edad}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="RUT"
                                variant="outlined"
                                disabled
                                id="rut"
                                value={formik.values.rut}
                                onChange={formik.handleChange}
                                error={formik.touched.rut && formik.errors.rut}
                                helperText={formik.touched.rut && formik.errors.rut}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Telefono"
                                variant="outlined"
                                id="telefono"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                error={formik.touched.telefono && formik.errors.telefono}
                                helperText={formik.touched.telefono && formik.errors.telefono}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                disabled
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs/>

                <Grid item xs={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>
                                <b>Tipo cuenta:</b> {perfilInfo.tipoCuenta}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                component={Link}
                                to={'/perfil/cambiar-contraseña'}
                                style={{fontSize: 12}}
                                startIcon={<VpnKeyIcon/>}
                            >
                                Cambiar contraseña
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{marginTop: 40}} align={'center'}>
                    <Button
                        disabled={formik.isSubmitting || messageType === "success"}
                        type={"submit"}
                    >
                        Guardar
                    </Button>
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
                        <h2 id="modal-title">Cuenta actualizada!</h2>
                        <p id="modal-description">lorem ipsum...</p>
                    </div>
                </Fade>
            </Modal>
        </form>

        </>
    )
}

export default EditProfilePage;