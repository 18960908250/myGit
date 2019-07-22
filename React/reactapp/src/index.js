import React from 'react';
import ReactDOM from 'react-dom';
import APP from './app'
import {createStore} from 'redux'
import { Provider } from 'react-redux'

import reducer from  './reducer'

const store = createStore(reducer)
ReactDOM.render(
    <Provider store={store}>
        <APP />
    </Provider>,
    document.getElementById('root')
);