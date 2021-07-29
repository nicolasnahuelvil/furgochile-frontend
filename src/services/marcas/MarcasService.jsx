import {authHeader, handleResponse} from '../../helpers';

const config = {
    apiUrl: 'https://furgochile-backend.herokuapp.com'
}

export const marcasService = {
    getAll,
};

function getAll() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/marcas`, requestOptions).then(handleResponse);
}
