import { authHeader, handleResponse } from '../../helpers';

const config = {
    apiUrl: 'https://furgochile-backend.herokuapp.com'
}

export const furgonesService = {
    getAll,
    getById,
    getMisFurgones,
    getByRegionId,
    getByRegionIdAndComunaId,
    add,
    modificarEstado,
    edit,
    getMisServicios
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/furgones`, requestOptions).then(handleResponse);
}

function getMisFurgones() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/mis-furgones`, requestOptions).then(handleResponse);
}

function getMisServicios() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/mis-furgones/servicios`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/furgones/id/${id}`, requestOptions).then(handleResponse);
}

function getByRegionIdAndComunaId(regionId, comunaId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/furgones/region/${regionId}/comuna/${comunaId}`, requestOptions).then(handleResponse);
}

function getByRegionId(regionId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/furgones/region/${regionId}`, requestOptions).then(handleResponse);
}

function add(
    acompanante,
    anho,
    idMarca,
    idModelo,
    capacidad,
    patente,
    idRegion,
    idComuna,
    idEstado,
    selectFile) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            acompanante,
            anho,
            idMarca,
            idModelo,
            capacidad,
            patente,
            idRegion,
            idComuna,
            idEstado,
            image: selectFile

        })
    };

    return fetch(`${config.apiUrl}/agregar-furgon`, requestOptions)
        .then(handleResponse);
}

function modificarEstado(idFurgon) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/furgon/${idFurgon}/cambiar-estado`, requestOptions)
        .then(handleResponse);
}

function edit(
    idFurgon,
    acompanante,
    anho,
    idMarca,
    idModelo,
    capacidad,
    patente,
    idRegion,
    idComuna,
    idEstado,
    selectFile) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            idFurgon,
            acompanante,
            anho,
            idMarca,
            idModelo,
            capacidad,
            patente,
            idRegion,
            idComuna,
            idEstado,
            image: selectFile

        })
    };

    return fetch(`${config.apiUrl}/furgon/editar`, requestOptions)
        .then(handleResponse);
}
