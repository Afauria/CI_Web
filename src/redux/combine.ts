import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { reducers as commonReducers, epics as commonEpics } from './modules/common';
import { reducers as cimoduleReducers, epics as cimoduleEpics} from './modules/cimodule';
export const rootReducers = combineReducers({
  ...commonReducers,
  ...cimoduleReducers
});

const allEpics = [
  ...commonEpics,
  ...cimoduleEpics
];

export const rootEpics = combineEpics(...allEpics);
