import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HistoryIcon from '@material-ui/icons/History';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ListIcon from '@material-ui/icons/List';
import IconWithBottomText from "../../components/icon-with-bottom-text/IconWithBottomText";
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import MyProfilePage from "./pages/MyProfilePage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import VerifyPage from "./pages/VerifyPage";
import AddFurgonPage from "./pages/AddFurgonPage";
import {authenticationService} from "../../services";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import EditProfilePage from "./pages/EditProfilePage";
import ServicesPage from "./pages/ServicesPage";
import Button from "../../components/generic/Button";
import {Helmet} from "react-helmet-async";
import {myPerfilServices} from "../../services/mi-perfil/MiPerfilService";
import FurgonesPage from "./pages/FurgonesPage";
import EnableProfilePage from "./pages/EnableProfilePage";
import ServicesFurgonesPage from "./pages/ServicesFurgonesPage";
import AddServiceFurgonPage from "./pages/AddServiceFurgonPage";
import EditFurgonPage from "./pages/EditFurgonPage";

const ProfilePageBase = (props) => {

    const currentUser = authenticationService.currentUserValue;

    const renderCurrentPageComponent = () => {

        if(props.location.pathname.includes('/perfil/editar-furgon') ) {
            return <EditFurgonPage user={currentUser} {...props}/>
        }

        switch (props.location.pathname) {
            case '/perfil':
                return <MyProfilePage perfilInfo={perfilInfo}/>;
            case '/perfil/historial':
                return <PaymentHistoryPage user={currentUser}/>;
            case '/perfil/editar':
                return <EditProfilePage perfilInfo={perfilInfo}/>;
            case '/perfil/cambiar-contraseña':
                return <ChangePasswordPage user={currentUser}/>
            case '/perfil/servicios-contratados':
                return <ServicesPage user={currentUser}/>
            case '/perfil/mis-furgones':
                return <FurgonesPage user={currentUser}/>
            case '/perfil/agregar-furgon':
                return <AddFurgonPage user={currentUser}/>
            case '/perfil/servicio-furgon':
                return <AddServiceFurgonPage user={currentUser}/>  
            case '/perfil/habilitar-conductores':
                return <EnableProfilePage user={currentUser}/>   
            case '/perfil/servicio-furgones':
                return <ServicesFurgonesPage user={currentUser}/>  
            default:
                return null;
        }
    }

    const [perfilInfo, setMiPerfilInfo] = useState({});

    useEffect(() => {
        myPerfilServices.getMiPerfil().then(response => {
            setMiPerfilInfo(response)
        })
    }, [])

    return (
        <>

            <Helmet>
                <title>FurgoChile | Mi Perfil</title>
            </Helmet>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img src="https://www.eldinamo.cl/wp-content/uploads/2020/06/A_UNO_641687-2-1.jpg"
                         style={{width: '100%', height: 170}} alt="furgon"/>
                </Grid>

                <Grid item xs={1}>
                    <Grid container spacing={2} style={{paddingTop: 50}}>
                        <Grid item xs={12}>
                            <Button component={Link} to='/perfil'>
                                <IconWithBottomText
                                 icon={AccountBoxIcon} text='Mi cuenta'/>
                            </Button>
                        </Grid>
                        {currentUser.role === "ROLE_USER" &&<Grid item xs={12}>
                            <Button component={Link} to='/perfil/historial'>
                                <IconWithBottomText 
                                icon={HistoryIcon} text='Historial'/>
                            </Button>
                        </Grid>}
                        {currentUser.role === "ROLE_USER" &&<Grid item xs={12}>
                            <Button component={Link} to='/perfil/servicios-contratados'>
                                <IconWithBottomText
                                 icon={ListIcon} text='Servicios'/>
                            </Button>
                        </Grid>}
                        {currentUser.role === "ROLE_CONDUCTOR" && <Grid item xs={12}>
                            <Button component={Link} to='/perfil/mis-furgones'>
                                <IconWithBottomText 
                                icon={DirectionsBusIcon} text='Furgones'/>
                            </Button>
                        </Grid>}
                        {currentUser.role === "ROLE_CONDUCTOR" && <Grid item xs={12}>
                            <Button component={Link} to='/perfil/servicio-furgones'>
                                <IconWithBottomText 
                                icon={ListIcon} text='Servicios'/>
                            </Button>
                        </Grid>}
                        {currentUser.role === "ROLE_ADMIN" && <Grid item xs={12}>
                            <Button component={Link} to='/perfil/habilitar-conductores'>
                                <IconWithBottomText
                                icon={AssignmentTurnedInIcon} text='Conductores'/>
                            </Button>
                        </Grid>}
                    </Grid>
                </Grid>

                <Grid item xs={9} style={{paddingLeft: 50}}>
                    {renderCurrentPageComponent()}
                </Grid>
            </Grid>
        </>
    )
}

export default ProfilePageBase;