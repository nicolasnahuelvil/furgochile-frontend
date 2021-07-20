import React from 'react';
import {Route, Router} from 'react-router-dom';
import Header from './components/header/header.component';
import LoginPage from "./pages/login/login.component";
import SearchPage from './pages/search/SearchPage';
import ProfilePageBase from './pages/profile/ProfilePageBase';
import HomePage from './pages/homepage/homepage.component';
import SignUp from './pages/sign-up/sign-up';
import SupportPage from './pages/support/SupportPage';
import {history} from "./helpers";
import {AuthRoute} from "./routes/AuthRoute";
import {NoAuthRoute} from "./routes/NoAuthRoute";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import ContractServicePage from "./pages/contract-service/ContractServicePage";
import ResetPasswordPage from './pages/reset-password/resetpassword.component';

const App = () => {

    return (
        <Router history={history}>
            <Header history={history}/>
                <div style={{padding: '20px 40px'}}>
                    <Route exact path='/' component={HomePage}/>
                    <NoAuthRoute path='/crear-cuenta' component={SignUp}/>
                    <Route path='/busqueda' component={SearchPage}/>
                    <Route path='/soporte' component={SupportPage}/>
                    <NoAuthRoute exact path='/login' component={LoginPage}/>
                    <NoAuthRoute exact path='/recuperar-contraseña' component={ResetPasswordPage} />
                    <AuthRoute path='/perfil' component={ProfilePageBase}/>
                    <AuthRoute path='/contratar-servicio' component={ContractServicePage}/>
                    <Route path='/no-encontrado' component={NotFoundPage}/>
                </div>
        </Router>
    )
}

export default App;
