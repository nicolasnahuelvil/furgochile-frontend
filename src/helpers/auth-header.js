import {authenticationService} from '../services';

export const authHeader = () => {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return{
            Authorization: `Bearer ${currentUser.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    } else {
        return {

        };
    }
}