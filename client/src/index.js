//straight file to css so dont have to name it
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
/***to test with axios post api/survey with out front end */
import axios from 'axios';
window.axios = axios;


//combined reducers, state object, middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render( //pass state down to app and all children
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root'));

//console.log('stripe key: ', process.env.REACT_APP_STRIPE_KEY);
//console.log('environement: ', process.env.NODE_ENV);