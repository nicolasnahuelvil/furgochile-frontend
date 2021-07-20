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

const LoginPage = () => {

    const classes = useStyles();
    const [errorLoginService, setErrorLoginService] = useState(undefined);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validationSchema:
            Yup.object().shape({
                email: Yup.string().required('Debes ingresar el nombre de usuario.'),
                password: Yup.string().required('Debes ingresar la contraseña.')
            }),
        onSubmit({email, password, rememberMe}, {setErrors, setSubmitting}) {
            authenticationService.login(email, password)
                .then(response => {
                    //const {from} = location.state || {from: {pathname: "/"}};
                    console.log(response)
                    window.location.href = '/';
                })
                .catch(error => {
                    console.log(error)
                    setSubmitting(false);
                    setErrorLoginService(error);
                });
        }
    });

    useEffect(() => {
        const currentUser = authenticationService.currentUserValue;
        if (currentUser) window.location.href = '/'
    }, []);

    return (
        <>
            <Helmet>
                <title>FurgoChile | Iniciar sesión</title>
            </Helmet>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>
                    {errorLoginService &&
                        <Alert severity="error" style={{marginTop: 20, marginBottom: 20}}>{errorLoginService}</Alert>
                    }
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
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && formik.errors.password}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Recuerdame"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            disabled={formik.isSubmitting}
                            type={"submit"}
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{marginTop: 15, marginBottom: 15}}
                        >
                            Entrar
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item xs>
                                <Link to="/recuperar-contraseña" variant="body2">
                                    ¿Has olvidado la contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/crear-cuenta">
                                    {"¿No tienes cuenta? Registrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                </Box>
            </Container>
        </>
    );
}

export default LoginPage;