/**
 * Configure Store and Saga
 */

//  Getting Redux and Saga modules
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// Get cepReducer (or rootReducer on bigger application)
import cepReducer from "./reducers";

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create Store with sagaMiddleware
const store = createStore(cepReducer, applyMiddleware(sagaMiddleware));

// Export Store
export {
  sagaMiddleware,
  store
};
