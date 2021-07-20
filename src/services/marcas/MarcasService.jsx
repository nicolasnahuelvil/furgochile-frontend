import {authHeader, handleResponse} from '../../helpers';

const config = {
    apiUrl: 'http://localhost:8080'
}

export const marcasService = {
    getAll,
};

function getAll() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/marcas`, requestOptions).then(handleResponse);
}