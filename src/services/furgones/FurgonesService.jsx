import {authHeader, handleResponse} from '../../helpers';

const config = {
    apiUrl: 'https://furgochile-backend.herokuapp.com'
}

export const furgonesService = {
    getAll,
    getById,
    getMisFurgones,
    getByRegionId,
    getByRegionIdAndComunaId,
};

function getAll() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/furgones`, requestOptions).then(handleResponse);
}

function getMisFurgones() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/mis-furgones`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/furgones/id/${id}`, requestOptions).then(handleResponse);
}

function getByRegionIdAndComunaId(regionId, comunaId) {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/furgones/region/${regionId}/comuna/${comunaId}`, requestOptions).then(handleResponse);
}

function getByRegionId(regionId) {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${config.apiUrl}/furgones/region/${regionId}`, requestOptions).then(handleResponse);
}