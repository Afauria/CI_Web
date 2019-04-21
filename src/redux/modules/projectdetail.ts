import { createAction, handleActions } from "redux-actions";
import { from } from "rxjs";
import { catchError, mergeMap, map } from "rxjs/operators";
import { request } from "../../lib/fetch";
import { ofType } from "redux-observable";

export const getProjectInfoSuccess = createAction("getProjectInfoSuccess");
export const getProjectInfo = createAction("getProjectInfo");
const getProjectInfoError = createAction("getProjectInfoError");

export const getProjectHistorySuccess = createAction(
  "getProjectHistorySuccess"
);
export const getProjectHistory = createAction("getProjectHistory");
const getProjectHistoryError = createAction("getProjectHistoryError");

/*
 * reducer 相关
 */
const projectInfo = handleActions(
  {
    getProjectInfoSuccess: (state, action) => {
      return action.payload;
    },

    getProjectInfoError: () => {
      return { data: [] };
    }
  },
  {}
);

const projectHistory = handleActions(
  {
    getProjectHistorySuccess: (state, action) => {
      return action.payload;
    },

    getProjectHistoryError: () => {
      return { data: [] };
    }
  },
  {}
);

export const reducers = {
  projectInfo,
  projectHistory
};

/*
 * epic 相关
 */
const getProjectInfo$ = action$ =>
  action$.pipe(
    ofType(getProjectInfo),
    mergeMap(action =>
      from(request.get("api/project/info/" + action.payload)).pipe(
        map(resp => getProjectInfoSuccess(resp)),
        catchError(err => getProjectInfoError(err))
      )
    )
  );

const getProjectHistory$ = action$ =>
  action$.pipe(
    ofType(getProjectHistory),
    mergeMap(action =>
      from(request.get("api/project/info/history",action.payload)).pipe(
        map(resp => getProjectHistorySuccess(resp)),
        catchError(err => getProjectHistoryError(err))
      )
    )
  );

export const searchProjectModules = (data, success, error) =>
  postPipe("api/project/modules/list", data, success, error);

export const addProjectModule = (data, success, error) =>
  postPipe("api/project/modules/add", data, success, error);

export const removeProjectModule = (data, success, error) =>
  postPipe("api/project/modules/remove", data, success, error);

export const buildProject = (data, success, error) =>
  postPipe("api/project/build", data, success, error);

export const integrateProject = (data, success, error) =>
  postPipe("api/project/integrate", data, success, error);

export const searchBuildVersion = (data, success, error) =>
  postPipe("api/project/searchNextVersion", data, success, error);

export const searchModuleVersions = (data, success, error) =>
  postPipe("api/module/searchVersions", data, success, error);

export const searchModulesName = (data, success, error) =>
  postPipe("api/module/searchEnableModulesName", data, success, error);

export const searchProjectBuildReport= (data, success, error) =>
  postPipe("api/project/info/buildReport", data, success, error);

const postPipe = (url, data, success, error) => {
  from(request.post(url, data))
    .pipe(
      map(resp => success(resp)),
      catchError(err => {
        error(err);
        return err;
      })
    )
    .subscribe();
};

export const epics = [getProjectInfo$, getProjectHistory$];
