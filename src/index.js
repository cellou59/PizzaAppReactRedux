import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import './index.css';
import App from './App';
import NewOrder from './components/NewOrder';
import Order from './components/Order';
import PaymentOrder from './components/PaymentOrder';
import Orders from './components/Orders';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // pour pouvoir utiliser Redux Devtools 
);

const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/new' component={NewOrder} />
            <Route path='/order/:oid' component={Order} />
            <Route exact path='/orders' component={Orders} />
            <Route exact path='/payment-order' component={PaymentOrder} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
