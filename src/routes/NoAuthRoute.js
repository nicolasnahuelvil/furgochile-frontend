import {Redirect, Route} from 'react-router-dom';
import {authenticationService} from '../services';
import React from "react";

export const NoAuthRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;

        if (currentUser) {
            return <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        }

        return <Component {...props} />
    }}/>
)