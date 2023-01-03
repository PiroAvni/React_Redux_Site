import { compose, createStore, applyMiddleware } from "redux";
//import { configureStore } from "redux";
import logger from "redux-logger";

//import thunk from "redux-thunk";

import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./root-saga";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

//export const store = configureStore(rootReducer, undefined, composedEnhancers);
/* 
export default function configureStore(preloadedState) {
    const middleware = [logger]
    const middlewareEnhancer = applyMiddleware(...middleware)
  
    // const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = compose(applyMiddleware(...middleWare))
  
    const store = createStore(rootReducer, preloadedState, composedEnhancers)
  
    return store
  } */

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//const middleWares = [loggerMiddleware];

//const middleWares = [process.env.NODE_ENV !== "production" && logger,thunk,].filter(
// Boolean
//);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

//const composedEnhancers = compose(applyMiddleware(...middleWares));

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
