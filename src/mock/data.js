import {Role} from "../models/Role";

const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        firstName: 'Karla',
        lastName: 'Ortega',
        role: Role.Admin,
    },
    {
        id: 2,
        username: 'user',
        password: 'user',
        firstName: 'Nicolas',
        lastName: 'Nahuelvil',
        role: Role.User
    },
    {
        id: 3,
        username: 'driver',
        password: 'driver',
        firstName: 'Miguel',
        lastName: 'Salinas',
        role: Role.Driver
    }
];

const furgones = [
    {   
        id: 1,
        chofer: 'Chofer Temuco',
        horario: 'Mañana y tarde',
        desde: 100000,
        location: {
            regionId: 9,
            comunaId: 26,
        },
        score: {
            puntuacion: 4.3,
            puntualidad: 4,
            atencion: 4.5,
            calidadFurgon: 4.6,
            quantityServices: 19
        },
        personalInfo: {
            nombre: 'juan',
            telefono: '911111111',
            correo: 'temuco@sdfaf.com',
        },
        servicios: [
            {id: 1, genero: "Mujer", capacidad: 10, tipoServicio: "Bus Urbano", horario: "Mañana", disponible: 2, valor: 120000},
            {id: 2, genero: "Mujer", capacidad: 15, tipoServicio: "Bus Urbano", horario: "Mañana", disponible: 4, valor: 110000},
            {id: 3, genero: "Mujer", capacidad: 18, tipoServicio: "Bus Urbano", horario: "Mañana", disponible: 6, valor: 110000}
        ]
    },
    {   
        id: 2,
        chofer: 'Chofer Padre las casas',
        horario: 'tarde',
        desde: 80000,
        location: {
            regionId: 9,
            comunaId: 19,
        },
        score: {
            puntuacion: 3.9,
            puntualidad: 4,
            atencion: 4.2,
            calidadFurgon: 3.6,
            quantityServices: 63
        },
        personalInfo: {
            nombre: 'pepe',
            telefono: '922222222',
            correo: 'plc@sdfaf.com',
        },
        servicios: [
            {id: 4, genero: "Mujer", capacidad: 10, tipoServicio: "Bus Rural", horario: "Mañana", disponible: 2, valor: 120000},
            {id: 5, genero: "Mujer", capacidad: 15, tipoServicio: "Bus Rural", horario: "Mañana", disponible: 4, valor: 110000},
            {id: 6, genero: "Mujer", capacidad: 18, tipoServicio: "Bus Rural", horario: "Mañana", disponible: 6, valor: 110000}
        ]
    },
    {   
        id: 3,
        chofer: 'Chofer Santiago',
        horario: 'tarde',
        desde: 50000,
        location: {
            regionId: 13,
            comunaId: 49,
        },
        score: {
            puntuacion: 4.9,
            puntualidad: 4.8,
            atencion: 4.9,
            calidadFurgon: 4.9,
            quantityServices: 63
        },
        personalInfo: {
            nombre: 'miguel',
            telefono: '933333333',
            correo: 'stgo@sdfaf.com',
        },
        servicios: [
            {id: 7, genero: "Mujer", capacidad: 10, tipoServicio: "Mini Bus Urbano", horario: "Mañana", disponible: 2, valor: 120000},
            {id: 8, genero: "Mujer", capacidad: 15, tipoServicio: "Mini Bus Urbano", horario: "Mañana", disponible: 4, valor: 110000},
            {id: 9, genero: "Mujer", capacidad: 18, tipoServicio: "Mini Bus Urbano", horario: "Mañana", disponible: 6, valor: 110000}
        ]
    },
    {   
        id: 4,
        chofer: 'Chofer Valparaiso',
        horario: 'tarde',
        desde: 65000,
        location: {
            regionId: 5,
            comunaId: 35,
        },
        score: {
            puntuacion: 3,
            puntualidad: 3.5,
            atencion: 4,
            calidadFurgon: 3.2,
            quantityServices: 5
        },
        personalInfo: {
            nombre: 'felipe',
            telefono: '944444444',
            correo: 'valparaiso@sdfaf.com',
        },
        servicios: [
            {id: 10, genero: "Mujer", capacidad: 10, tipoServicio: "Mini Bus Rural", horario: "Mañana", disponible: 2, valor: 120000},
            {id: 11, genero: "Mujer", capacidad: 15, tipoServicio: "Mini Bus Rural", horario: "Mañana", disponible: 4, valor: 110000},
            {id: 12, genero: "Mujer", capacidad: 18, tipoServicio: "Mini Bus Rural", horario: "Mañana", disponible: 6, valor: 110000}
        ]
    },
    {   
        id: 5,
        chofer: 'Chofer Antofagasta',
        horario: 'Mañana y tarde',
        desde: 120000,
        location: {
            regionId: 2,
            comunaId: 1,
        },
        score: {
            puntuacion: 4.6,
            puntualidad: 4.8,
            atencion: 4.9,
            calidadFurgon: 4.9,
            quantityServices: 63
        },
        personalInfo: {
            nombre: 'martin',
            telefono: '955555555',
            correo: 'antofagasta@sdfaf.com',
        },
        servicios: [
            {id: 13, genero: "Mujer", capacidad: 10, tipoServicio: "Bus Urbano", horario: "Mañana", disponible: 2, valor: 120000},
            {id: 14, genero: "Mujer", capacidad: 15, tipoServicio: "Bus Urbano", horario: "Mañana", disponible: 4, valor: 110000},
            {id: 15, genero: "Mujer", capacidad: 18, tipoServicio: "Bus Urbano", horario: "Mañana", disponible: 6, valor: 110000}
        ]
    }
];

export const DataMock = {
    users,
    furgones
}