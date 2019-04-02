import { createAction, handleActions } from "redux-actions";
import { from } from "rxjs";
import { catchError, mergeMap, map } from "rxjs/operators";
import { request } from "../../lib/fetch";
import { ofType } from "redux-observable";

export const getProjectListSuccess = createAction("getProjectListSuccess");
export const getProjectList = createAction("getProjectList");
const getProjectListError = createAction("getProjectListError");

/*
 * reducer 相关
 */
const ciProject = handleActions(
  {
    getProjectListSuccess: (state, action) => {
      return action.payload;
    },

    getProjectListError: () => {
      return { data: [] };
    }
  },
  {}
);

export const reducers = {
  ciProject
};

/*
 * epic 相关
 */
const getProjectList$ = action$ =>
  action$.pipe(
    ofType(getProjectList),
    mergeMap(action =>
      from(request.get("api/project/list", action.payload)).pipe(
        map(resp => getProjectListSuccess(resp)),
        catchError(err => getProjectListError(err))
      )
    )
  );


export const addProject = (data, success, error) =>
  postPipe("api/project/add", data, success, error);

export const removeProject = (data, success, error) =>
  postPipe("api/project/remove", data, success, error);

export const modifyProject = (data, success, error) =>
  postPipe("api/project/modify", data, success, error);

export const buildProject = (data, success, error) =>
  postPipe("api/project/build", data, success, error);

export const searchBuildVersion = (data, success, error) =>
  postPipe("api/project/searchVersion", data, success, error);
  
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

export const epics = [
  getProjectList$
];
