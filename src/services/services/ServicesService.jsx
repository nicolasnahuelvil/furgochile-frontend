import {authHeader, handleResponse} from '../../helpers';

const config = {
    apiUrl: 'http://localhost:8080'
}

export const servicesService = {
    getMisServicios,
    contratarServicio,
    add,
    obtenerConductoresPendientes,
    rechazarConductor,
    aprobarConductor
};

function getMisServicios() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/mis-servicios`, requestOptions).then(handleResponse);
}

function rechazarConductor(id) {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/conductor/${id}/rechazar`, requestOptions).then(handleResponse);
}

function aprobarConductor(id) {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/conductor/${id}/aceptar`, requestOptions).then(handleResponse);
}

function obtenerConductoresPendientes() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/conductores/pendientes`, requestOptions).then(handleResponse);
}

function contratarServicio(idServicio) {
    const requestOptions = {method: 'POST', headers: authHeader(), body: JSON.stringify({idServicio})};
    return fetch(`${config.apiUrl}/servicios/contratar`, requestOptions).then(handleResponse);
}

function add(idFurgon, idHorario, idTipoServicio, idSexo, capacidad, valorServicio) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            idFurgon, 
            valor: valorServicio,
            idTipoHorario: idHorario, 
            idTipoServicio, 
            idSexo, 
            capacidad,

        })
    };

    return fetch(`${config.apiUrl}/agregar-servicio`, requestOptions)
        .then(handleResponse);
}
