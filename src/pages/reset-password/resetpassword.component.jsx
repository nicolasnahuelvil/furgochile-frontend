import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {authenticationService} from "../../services";
import {useFormik} from "formik";
import * as Yup from 'yup';
import Button from "../../components/generic/Button";
import {Link} from "react-router-dom";
import TextField from "../../components/generic/TextField";
import {Helmet} from "react-helmet-async";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#F2E55F',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ResetPasswordPage = () => {

    const classes = useStyles();
    const [responseMsg, setResponseMsg] = useState(undefined);
    const [msgType, setMsgType] = useState(undefined);
    const [msgType2, setMsgType2] = useState(undefined);
    const [currentStep, setCurrentStep] = useState(0);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema:
            Yup.object().shape({
                email: Yup.string().required('Debes ingresar el nombre de usuario.'),
            }),
        onSubmit({email}, {setErrors, setSubmitting}) {
            setCurrentStep(currentStep => currentStep+1);
        authenticationService.resetPassword1(email).then(response => {
            setMsgType("success");
            setResponseMsg(response.details[0])
            setSubmitting(false);
        }).catch(error => {
            setMsgType("error");
            setResponseMsg(error[0])
            setSubmitting(false);
        });
    
            }
        });

    const formik2 = useFormik({
        initialValues: {
            email: "",
            password: "",
            resetCode: ""
        },
        validationSchema:
            Yup.object().shape({
                email: Yup.string().required('Debes ingresar el nombre de usuario.'),
                password: Yup.string().required('Debes ingresar la contraseña.'),
                resetCode: Yup.number().typeError('Debe ser un número.').required('Debes ingresar el código.').positive().integer(),
            }),
        onSubmit({email, password, resetCode}, {setErrors, setSubmitting}) {
            authenticationService.resetPassword2(email, resetCode, password)
            .then(response => {
                setMsgType2("success");
                setMsgType("success");
                setResponseMsg(response.details[0])
                setSubmitting(false);
            }).catch(error => {
                setMsgType2("error");
                setMsgType("error");
                setResponseMsg(error[0])
                setSubmitting(false);
            });
    
            }
        });

    useEffect(() => {
        const currentUser = authenticationService.currentUserValue;
        if (currentUser) window.location.href = '/'
    }, []);


    const paso1 = () => (
        <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo electronico"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && formik.errors.email}
                                    helperText={formik.errors.email}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            disabled={formik.isSubmitting || msgType === "success"}
                            type={"submit"}
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{marginTop: 15, marginBottom: 15}}
                        >
                            Enviar
                        </Button>
        </form>
    )

    const paso2 = () => (
        <form className={classes.form} onSubmit={formik2.handleSubmit} noValidate>
        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo electronico"
                                    name="email"
                                    autoComplete="email"
                                    value={formik2.values.email}
                                    onChange={formik2.handleChange}
                                    error={formik2.touched.email && formik2.errors.email}
                                    helperText={formik2.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="resetCode"
                                    label="Codigo"
                                    type="resetCode"
                                    id="resetCode"
                                    value={formik2.values.resetCode}
                                    onChange={formik2.handleChange}
                                    error={formik2.touched.resetCode && formik2.errors.resetCode}
                                    helperText={formik2.touched.resetCode && formik2.errors.resetCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Nueva contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formik2.values.password}
                                    onChange={formik2.handleChange}
                                    error={formik2.touched.password && formik2.errors.password}
                                    helperText={formik2.touched.password && formik2.errors.password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            disabled={formik2.isSubmitting || msgType2 === "success"}
                            type={"submit"}
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{marginTop: 15, marginBottom: 15}}
                        >
                            Cambiar contraseña
                        </Button>
        </form>
    )

    return (
        <>
            <Helmet>
                <title>FurgoChile | Recuperar contraseña</title>
            </Helmet>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Restablecer contraseña
                    </Typography>
                    {msgType && responseMsg &&
                        <Alert severity={msgType} style={{marginTop: 20, marginBottom: 20}}>{responseMsg}</Alert>
                    }
                    {
                            currentStep === 0 ? paso1() : paso2()
                    }
                    
                </div>
                <Box mt={5}>
                </Box>
            </Container>
        </>
    );
}

export default ResetPasswordPage;