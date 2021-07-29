import {authHeader, handleResponse} from '../../helpers';

const config = {
    apiUrl: 'https://furgochile-backend.herokuapp.com'
}

export const regionService = {
    getAll,
};

function getAll() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/regiones`, requestOptions).then(handleResponse);
}
