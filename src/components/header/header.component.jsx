import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { AppBar, Grid, makeStyles, Toolbar } from "@material-ui/core";
import { authenticationService } from '../../services';
import Button from "../generic/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = ({history}) => {

    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);

    const classes = useStyles();
    useEffect(() => {
        setCurrentUser(authenticationService.currentUserValue)
    }, [currentUser])

    const logout = () => {
        authenticationService.logout();
        window.location.href = '/'
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" variant={'outlined'} color='white'>
                <Toolbar>
                    <Link to='/'>
                        <Logo className='logo' />
                    </Link>
                    <Grid container spacing={2}>
                        <Grid item xs />
                        <Grid item>
                            <Button
                                component={Link}
                                to='/busqueda'
                                startIcon={<SearchIcon />}
                            >
                                BUSCAR
                            </Button>
                        </Grid>
                        {currentUser && <Grid item >
                            <Button
                                component={Link}
                                to='/perfil'
                                startIcon={<AccountBoxIcon />}
                            >
                                MI PERFIL
                            </Button>
                        </Grid>}
                        <Grid item>
                            {currentUser ? (
                                <Button
                                    onClick={logout}
                                    startIcon={<ExitToAppIcon />}
                                >
                                    CERRAR SESIÓN
                                </Button>
                            ) : (
                            <Button
                                component={Link}
                                to='/login'
                                startIcon={<AccountCircleIcon />}
                            >
                                INICIAR SESIÓN
                            </Button>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}



export default Header;
