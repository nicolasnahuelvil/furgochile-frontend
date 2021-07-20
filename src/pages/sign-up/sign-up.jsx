import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from "../../components/generic/Button";
import {Helmet} from "react-helmet-async";
import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RegionSelect from "../../components/region-comuna-selects/region-select.component";
import ComunaSelect from "../../components/region-comuna-selects/comuna-select.component";
import CircularCheckbox from "../../components/generic/CircularCheckbox";
import Alert from "@material-ui/lab/Alert";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {authenticationService} from "../../services";


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

export default function SignUp() {
    const classes = useStyles();

    const [comunaSelected, setComunaSelected] = useState(undefined);
    const [regionSelected, setRegionSelected] = useState(undefined);
    const [idSexo, setIdSexo] = useState(undefined);
    const [idTipoLicencia, setIdTipoLicencia] = useState(undefined);
    const [message, setErrorMessage] = useState(undefined);
    const [messageType, setMessageType] = useState(undefined);


    const splitRutDV = (rut) => rut.split("-");

    const obtenerEdad = () => {

    }

    const formik = useFormik({
        initialValues: {
            nombres: "",
            apellidos: "",
            rut: "",
            edad: "",
            email: "",
            password: "",
            phone: "",
            isConductor: false,
        },
        validationSchema:
            Yup.object().shape({
                nombres: Yup.string().required('Debes ingresar tu/s nombre/s.'),
                apellidos: Yup.string().required('Debes ingresar tu/s apellido/s.'),
                rut: Yup.string().required('Debes ingresar tu rut.').matches(/^(\d{1,3}(?:\d{1,3}){2}-[\dkK])$/, 'Debes ingresar un rut valido'),
                email: Yup.string().email("Debes ingresar un email valido").required('Debes ingresar tu email.'),
                password: Yup.string().required('Debes ingresar la contraseña.'),
                edad: Yup.number().typeError('Solo números').required('Debes ingresar tu edad.').positive().integer(),
                phone: Yup.number().typeError('Tu telefono debe ser solo numeros').required('Debes ingresar tu celular.').positive().integer()
            }),
        onSubmit({nombres, apellidos, rut, edad, email, password, phone, isConductor}, {setErrors, setSubmitting}) {
            console.log("ON SUBMITING")

            const rutSplited = splitRutDV(rut);

            if (rutSplited.length !== 2) {
                setErrorMessage("El rut debe ser en formato 11111111-1")
                setMessageType("error");
                return;
            }

            const idRol = isConductor ? 2 : 3;

            authenticationService.register(nombres, apellidos, rutSplited[0], rutSplited[1], edad, phone, idSexo, comunaSelected.id, email, password, idRol, idTipoLicencia)
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

            <Helmet>
                <title>FurgoChile | Registro</title>
            </Helmet>

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Crear cuenta
                    </Typography>
                    {   message &&
                        <Alert severity={messageType}>{message}</Alert>
                    }
                    <form className={classes.form} onSubmit={formik.handleSubmit} noValidate autoComplete={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Nombres"
                                    id="nombres"
                                    autoFocus
                                    value={formik.values.nombres}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nombres && formik.errors.nombres}
                                    helperText={formik.touched.nombres && formik.errors.nombres}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Apellidos"
                                    id="apellidos"
                                    value={formik.values.apellidos}
                                    onChange={formik.handleChange}
                                    error={formik.touched.apellidos && formik.errors.apellidos}
                                    helperText={formik.touched.apellidos && formik.errors.apellidos}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="RUT (ej: 11111111-1)"
                                    id="rut"
                                    value={formik.values.rut}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rut && formik.errors.rut}
                                    helperText={formik.touched.rut && formik.errors.rut}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Edad"
                                    id="edad"
                                    value={formik.values.edad}
                                    onChange={formik.handleChange}
                                    error={formik.touched.edad && formik.errors.edad}
                                    helperText={formik.touched.edad && formik.errors.edad}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Correo electronico"
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && formik.errors.email}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Contraseña"
                                    id="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && formik.errors.password}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Telefono"
                                    id="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && formik.errors.phone}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined">
                                    <InputLabel>Sexo</InputLabel>
                                    <Select
                                        label="Sexo"
                                        id="idSexo"
                                        fullWidth
                                        style={{width: 190}}
                                        value={idSexo}
                                        onChange={event => setIdSexo(event.target.value)}
                                    >
                                        <MenuItem value={1}>Hombre</MenuItem>
                                        <MenuItem value={2}>Mujer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <RegionSelect regionSelected={regionSelected} setRegionSelected={setRegionSelected} />
                            </Grid>
                            <Grid item xs={6}>
                                <ComunaSelect regionSelected={regionSelected} comunaSelected={comunaSelected} setComunaSelected={setComunaSelected}/>
                            </Grid>
                            <Grid item xs={12}>
                                <CircularCheckbox
                                    id="isConductor"
                                    checked={formik.values.isConductor}
                                    onChange={formik.handleChange}
                                    filled={true}
                                    label={'Soy conductor de un furgon'}
                                />
                            </Grid>
                            { formik.values.isConductor &&
                                <Grid item xs={12}>
                                    <FormControl variant="outlined">
                                        <InputLabel>Tipo de licencia</InputLabel>
                                        <Select
                                            id="idTipoLicencia"
                                            label="Tipo de licencia"
                                            fullWidth={true}
                                            style={{width: 395}}
                                            value={idTipoLicencia}
                                            onChange={event => setIdTipoLicencia(event.target.value)}
                                        >
                                            <MenuItem value={1}>A1</MenuItem>
                                            <MenuItem value={2}>A2</MenuItem>
                                            <MenuItem value={3}>A3</MenuItem>
                                            <MenuItem value={4}>A4</MenuItem>
                                            <MenuItem value={5}>A5</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            }
                        </Grid>

                        <Button
                            fullWidth
                            variant="contained"
                            style={{marginTop: 15, marginBottom: 15}}
                            disabled={formik.isSubmitting || messageType === "success"}
                            type={"submit"}
                        >
                            Registrarse
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    ¿Tienes cuenta? Inicia sesión
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