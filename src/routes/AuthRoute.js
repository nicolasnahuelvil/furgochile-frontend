import {Redirect, Route} from 'react-router-dom';
import {authenticationService} from '../services';
import React from "react";

export const AuthRoute = ({component: Component, roles, ...rest}) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;

        if (!currentUser) {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }

        if (roles && roles.indexOf(currentUser.role) === -1) {
            return <Redirect to={{pathname: '/'}}/>
        }

        return <Component {...props} />
    }}/>
)