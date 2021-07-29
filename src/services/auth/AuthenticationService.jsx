import {BehaviorSubject} from 'rxjs';

import {authHeader, handleResponse} from '../../helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const config = {
    apiUrl: 'http://localhost:8080'
}

export const authenticationService = {
    login,
    register,
    edit,
    editPassword,
    resetPassword1,
    resetPassword2,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return fetch(`${config.apiUrl}/autenticacion/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function resetPassword1(username) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username})
    };

    return fetch(`${config.apiUrl}/autenticacion/recuperar-contraseña1`, requestOptions)
        .then(handleResponse);
}

function resetPassword2(username, resetCode, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, resetCode, password})
    };

    return fetch(`${config.apiUrl}/autenticacion/recuperar-contraseña2`, requestOptions)
        .then(handleResponse);
}

function register(nombres, apellidos, rut, dv, edad, telefono, idSexo, idComuna, email, password, idRol, idTipoLicencia
    ,selectFileCarnetFrontal, selectFileCarnetTrasero, selectFileLicenciaFrontal, selectFileLicenciaTrasero, numero_licencia, selectFilePerfil) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "datosPersonales": {
                nombres,
                apellidos,
                rut,
                dv,
                edad,
                telefono,
                idSexo,
                idComuna,
                img_perfil: selectFilePerfil
            },
            "informacionConductor": {
                img_carnet_frontal: selectFileCarnetFrontal,
                img_carnet_trasero: selectFileCarnetTrasero,
                img_licencia_frontal: selectFileLicenciaFrontal,
                img_licencia_trasero: selectFileLicenciaTrasero,
                numero_licencia
            },
            email,
            password,
            idRol,
            idTipoLicencia
        })
    };

    return fetch(`${config.apiUrl}/autenticacion/registro`, requestOptions)
        .then(handleResponse);
}

function edit(nombres, apellidos, edad, telefono) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            "datosPersonales": {
                nombres,
                apellidos,
                edad,
                telefono,
            },
        })
    };

    return fetch(`${config.apiUrl}/autenticacion/editar`, requestOptions)
        .then(handleResponse);
}

function editPassword(originalPassword, newPassword) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            originalPassword,
            newPassword
        })
    };

    return fetch(`${config.apiUrl}/autenticacion/editar-contraseña`, requestOptions)
        .then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}