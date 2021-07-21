import {authHeader, handleResponse} from '../../helpers';

const config = {
    apiUrl: 'https://furgochile-backend.herokuapp.com'
}

export const myPerfilServices = {
    getMiPerfil,
};

function getMiPerfil() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/usuario/mi-perfil`, requestOptions).then(handleResponse);
}