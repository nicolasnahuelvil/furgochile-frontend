import { Card, CardActionArea, CardActions, CardContent, CardMedia, ClickAwayListener, Grid, makeStyles, Typography } from "@material-ui/core";
import Button from "../../../components/generic/Button";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import { useEffect } from "react";
import { furgonesService } from "../../../services/furgones/FurgonesService";
import { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



const FurgonesPage = ({ user: currentUser }) => {

    const [misFurgones, setMisFurgones] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [idFurgonSelected, setIdFurgonSelected] = useState(undefined);
    const [responseMsg, setResponseMsg] = useState(undefined);
    const [responseCode, setResponseCode] = useState(undefined);


    const handleOpenDialogModificarEstado = (id) => {
        setIdFurgonSelected(id);
        handleClickOpen()
    }

    const handleModificarEstado = () => {
        furgonesService.modificarEstado(idFurgonSelected)
        .then(response => {
            setResponseCode("ok")
            setResponseMsg(response.details[0])
            getData()
        })
        .catch(error => {
            setResponseCode("error")
            setResponseMsg(error)
        })
        setOpen(false)
        setOpenAlert(true)
    }




    const renderFurgon = ({ id, modelo, conductor, patente, anho, capacidad, estado, comuna, acompanante, img }) => (
<>
        <Grid container item xs={4} justifyContent="center">
            <Card style={{ marginTop: 20, width: 350, height: 500 }}>
                <CardMedia
                    component="img"
                    alt="Furgon escolar"
                    height="200"
                    width="300"
                    image={img !== null ? img : "https://www.nissan-cdn.net/content/dam/Nissan/cl/vehicles/nv350escolar/FINAL%20NV350.jpg.ximg.l_12_m.smart.jpg"}
                    title="Furgon escolar"
                />
                <CardContent style={{ width: 350, height: 250 }}>
                    <Typography variant="h5" component="h2">
                        Furgon
                    </Typography>
                    <Typography>
                        <b>{conductor}</b><br />
                        <b>Modelo:</b> {modelo} <br />
                        <b>Patente:</b> {patente} <br />
                        <b>Año:</b> {anho}<br />
                        <b>Capacidad:</b> {capacidad}<br />
                        <b>Estado:</b> {estado}<br />
                        <b>Comuna:</b> {comuna}<br />
                        <b>Acompañante:</b> {acompanante}<br />
                    </Typography>
                    <CardActions>
                        <Button
                            component={Link}
                            to={'/perfil/editar-furgon/?idFurgon='+id}
                            position="center"
                        >
                            Editar
                        </Button>
                        <Button onClick={() => handleOpenDialogModificarEstado(id)}>
                            {estado === "Disponible" ? "Deshabilitar" : "Habilitar"}
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>



</>
    )

    const getData = () => {
        furgonesService.getMisFurgones().then(response => {
            console.log(response)
            setMisFurgones(response)
        })
    }

    useEffect(() => {
        furgonesService.getMisFurgones().then(response => {
            console.log(response)
            setMisFurgones(response)
        })
    }, []);



    return (
        <>
        <Grid container>
            <Grid item xs={12} style={{ padding: 25, marginBottom: 30 }}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant='h4' align='center'>
                            Mis furgones
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            component={Link}
                            to={'/perfil/agregar-furgon'}
                            style={{ fontSize: 12 }}
                            startIcon={<AddIcon />}>
                            Agregar furgon
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {misFurgones?.map(furgon => renderFurgon(furgon))}
                </Grid>
            </Grid>
        </Grid>

<Dialog
fullScreen={fullScreen}
open={open}
onClose={handleClose}
>
<DialogTitle>{"Eliminar furgon"}</DialogTitle>
<DialogContent>
    <DialogContentText
    style={{fontSize: 20, color: "black"}}>
        Estas a punto de eliminar este furgon
        ¿Deseas realmente eliminarlo?
    </DialogContentText>
</DialogContent>
<DialogActions>
    <Button autoFocus onClick={handleModificarEstado} color="primary">
        Aceptar
    </Button>
    <Button onClick={handleClose} color="primary" autoFocus>
        Cancelar
    </Button>
</DialogActions>
</Dialog>


<Dialog onClose={handleCloseAlert} open={openAlert}>
      <span>
          {responseMsg}
      </span>
    </Dialog>

</>
    )


}

export default FurgonesPage;