/*eslint-disable*/
//@ts-nocheck

/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './MainPageUI/mainPage';

import '@atlaskit/css-reset';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
