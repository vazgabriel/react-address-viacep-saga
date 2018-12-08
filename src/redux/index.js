/**
 * Configure Store and Saga
 */

//  Getting Redux and Saga modules
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// Get cepReducer (or rootReducer on bigger application)
import cepReducer from "./reducers";

// Get rootSaga
import rootSaga from "./sagas";

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create Store with sagaMiddleware
const store = createStore(cepReducer, applyMiddleware(sagaMiddleware));

// Run Sagas
sagaMiddleware.run(rootSaga);

// Export Store
export default store;
