import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpics, rootReducers } from './combine';


export default function configureStore(initialState) {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    rootReducers,
    initialState,
    applyMiddleware(epicMiddleware)
  );
  epicMiddleware.run(rootEpics);
  return store;
}
