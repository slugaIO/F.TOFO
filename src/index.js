import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

export const browserHistory = createBrowserHistory();

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();