import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import {
  reducers as commonReducers,
  epics as commonEpics
} from "./modules/common";
import {
  reducers as ciModuleReducers,
  epics as ciModuleEpics
} from "./modules/cimodule";
import {
  reducers as ciProjectReducers,
  epics as ciProjectEpics
} from "./modules/ciproject";

export const rootReducers = combineReducers({
  ...commonReducers,
  ...ciModuleReducers,
  ...ciProjectReducers
});

const allEpics = [...commonEpics, ...ciModuleEpics, ...ciProjectEpics];

export const rootEpics = combineEpics(...allEpics);
