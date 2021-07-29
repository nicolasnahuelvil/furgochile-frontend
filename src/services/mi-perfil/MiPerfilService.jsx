import {authHeader, handleResponse} from '../../helpers';

const config = {
    apiUrl: 'http://localhost:8080'
}

export const myPerfilServices = {
    getMiPerfil,
};

function getMiPerfil() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/usuario/mi-perfil`, requestOptions).then(handleResponse);
}