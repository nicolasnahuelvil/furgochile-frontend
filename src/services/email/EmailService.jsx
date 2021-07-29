import {authHeader, handleResponse} from '../../helpers';

const config = {
    apiUrl: 'http://localhost:8080'
}

export const emailService = {
    sendMail,
};

function sendMail(nombreFurgon, numeroFurgon, correoFurgon) {
    const requestOptions = {method: 'POST', headers: authHeader(), body: JSON.stringify({nombreFurgon, numeroFurgon, correoFurgon})};
    return fetch(`${config.apiUrl}/servicio/contratado`, requestOptions).then(handleResponse);
}