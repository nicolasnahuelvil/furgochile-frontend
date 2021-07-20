import {Fade, Grid, makeStyles, Modal, Typography} from "@material-ui/core";
import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
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

const ChangePasswordPage = () => {
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [message, setErrorMessage] = useState(undefined);
    const [messageType, setMessageType] = useState(undefined);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const formik = useFormik({
        initialValues: {
            originalPassword: "",
            newPassword: "",
            newPassword2: ""
        },
        validationSchema:
            Yup.object().shape({
                originalPassword: Yup.string().required('Debes ingresar tu contraseña actual.'),
                newPassword: Yup.string().required('Debes ingresar tu nueva contraseña.'),
                newPassword2: Yup.string().required('Debes confirmar tu nueva contraseña.'),
            }),
        onSubmit({originalPassword, newPassword, newPassword2}, {setErrors, setSubmitting}) {
            console.log("ON SUBMITING")

            if (newPassword !== newPassword2) {
                setMessageType("error")
                setErrorMessage("Las contraseñas nuevas no coinciden.")
                return ;
            }

            authenticationService.editPassword(originalPassword, newPassword)
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
            setSubmitting(false);
        }
    });

    return (
        <>
            <form className={classes.form} onSubmit={formik.handleSubmit} noValidate autoComplete={false}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{padding: 25}}>
                    <Typography variant='h4' align='center'>Cambiar contraseña</Typography>
                </Grid>

                <Grid item xs={12} style={{marginBottom: 30}}>
                    {   message &&
                    <Alert severity={messageType}>{message}</Alert>
                    }
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Contraseña actual"
                        variant="outlined"
                        type="password"
                        id="originalPassword"
                        value={formik.values.originalPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.originalPassword && formik.errors.originalPassword}
                        helperText={formik.touched.originalPassword && formik.errors.originalPassword}
                    />
                </Grid>

                <Grid item xs={12}>
                    <hr/>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Nueva contraseña"
                        variant="outlined"
                        id="newPassword"
                        type="password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.newPassword && formik.errors.newPassword}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Confirmar nueva contraseña"
                        variant="outlined"
                        type="password"
                        id="newPassword2"
                        value={formik.values.newPassword2}
                        onChange={formik.handleChange}
                        error={formik.touched.newPassword2 && formik.errors.newPassword2}
                        helperText={formik.touched.newPassword2 && formik.errors.newPassword2}
                    />
                </Grid>

                <Grid item xs={12} align="center">
                    <Button
                        disabled={messageType === "success"}
                        type={"submit"}
                    >
                        Aceptar
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
                        <h2 id="modal-title">Contraseña cambiada!</h2>
                        <p id="modal-description">Se cambio exitosamente su contraseña.</p>
                    </div>
                </Fade>
            </Modal>
            </form>
        </>
    )
}

export default ChangePasswordPage;