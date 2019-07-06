import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import watchAll from './sagas/image';

const initialState = {
  image: null,
  imageName: '',
  rotation: 0,
  scale: 1,
  position: { x: 0, y: 0 },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ROTATE':
      return {
        ...state,
        rotation: action.payload,
      };
    case 'SCALE':
      return {
        ...state,
        scale: action.payload,
      };
    case 'SET_POSITION':
      return {
        ...state,
        position: action.payload,
      };
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload.image,
        imageName: action.payload.imageName,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const saga = createSagaMiddleware();
// const store = createStore(reducer, undefined, applyMiddleware(saga));
const store = createStore(persistedReducer, undefined, applyMiddleware(saga));
const persistor = persistStore(store);
saga.run(watchAll);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
