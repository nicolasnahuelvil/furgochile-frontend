import React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from "react-helmet-async";
import './index.css';
import '@fontsource/roboto';
import App from './App';


//Configurar backend mock
import {configureFakeBackend} from "./helpers";

//
// configureFakeBackend();

const AppHelmet = () => (
    <HelmetProvider>
        <App />
    </HelmetProvider>
)

ReactDOM.render(<AppHelmet />, document.getElementById('root'));
