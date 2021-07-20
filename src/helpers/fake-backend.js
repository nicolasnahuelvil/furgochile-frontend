//import {Role} from '../models/Role';
import {DataMock} from '../mock/data';

export function configureFakeBackend() {
    let users = DataMock.users;
    let furgones = DataMock.furgones;

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const authHeader = opts.headers['Authorization'];
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
//        const roleString = isLoggedIn && authHeader.split('.')[1];
//        const role = roleString ? Role[roleString] : null;

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.username.toLowerCase() === params.username.toLowerCase() && x.password === params.password);
                    if (!user) return error('Nombre de usuario o contraseña incorrecto');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar,
                        role: user.role,
                        token: `fake-jwt-token.${user.role}`
                    });
                }

                // get user by id - admin or user (user can only access their own record)
                if (url.match(/\/furgones\/\d+$/) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);


                    const furgon = furgones.find(x => x.id === id);
                    return ok(furgon);
                }

                // get furgones by region
                if (url.match(/\/furgones\/region\/\d+$/) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    const furgon = furgones.filter(x => x.location.regionId === id);
                    return ok(furgon);
                }

                // get furgones by region and comuna
                if (url.match(/\/furgones\/region\/\d+\/comuna\/\d+$/) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let comunaId = parseInt(urlParts[urlParts.length - 1]);
                    let regionId = parseInt(urlParts[urlParts.length - 3]);

                    const furgon = furgones.filter(x => x.location.regionId === regionId && x.location.comunaId === comunaId);
                    return ok(furgon);
                }

                if (url.endsWith('/furgones') && opts.method === 'GET') {
                    return ok(furgones);
                }

                if (url.match(/\/servicios\/\d+$/) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);


                    const furgon = furgones.find(furgon => furgon.servicios.find(detail => detail.id === id));
                    return ok(furgon);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ok: true, text: () => Promise.resolve(JSON.stringify(body))})
                }

                function unauthorised() {
                    resolve({status: 401, text: () => Promise.resolve(JSON.stringify({message: 'Unauthorised'}))})
                }

                function error(message) {
                    resolve({status: 400, text: () => Promise.resolve(JSON.stringify({message}))})
                }
            }, 500);
        });
    }
}