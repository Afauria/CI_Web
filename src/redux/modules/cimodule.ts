import { createAction, handleActions } from "redux-actions";
import { from } from "rxjs";
import { catchError, mergeMap, map } from "rxjs/operators";
import { request } from "../../lib/fetch";
import { ofType } from "redux-observable";

export const getModuleListSuccess = createAction("getModuleListSuccess");
export const getModuleList = createAction("getModuleList");
const getModuleListError = createAction("getModuleListError");

/*
 * reducer 相关
 */
const ciModule = handleActions(
  {
    getModuleListSuccess: (state, action) => {
      return action.payload;
    },

    getModuleListError: () => {
      return { data: [] };
    }
  },
  {}
);

export const reducers = {
  ciModule
};

/*
 * epic 相关
 */
const getModuleList$ = action$ =>
  action$.pipe(
    ofType(getModuleList),
    mergeMap(action =>
      from(request.get("api/module/list", action.payload)).pipe(
        map(resp => getModuleListSuccess(resp)),
        catchError(err => getModuleListError(err))
      )
    )
  );

// const addModule$ = action$ => action$.ofType('addModule')
//   .mergeMap(action => {
//     const { success, error } = action?.meta;
//     const [succ, err] = fromPromise(request.post('v1/app_Module/add', action?.payload))
//       .catch(x => {
//         error?.(x);
//         return of(addModuleError());
//       })
//       .partition(x => x.success);

//     return merge(
//       succ.map(x => {
//         success?.(x);
//         return addModuleSuccess(x.result);
//       }),
//       err.map(x => {
//         error?.(x);
//         return addModuleError({});
//       })
//     );
//   });

export const addModule = (data, success, error) =>
  postPipe("api/module/add", data, success, error);

export const removeModule = (data, success, error) =>
  postPipe("api/module/remove", data, success, error);

export const modifyModule = (data, success, error) =>
  postPipe("api/module/modify", data, success, error);

export const buildModule = (data, success, error) =>
  postPipe("api/module/build", data, success, error);

export const searchBuildVersion = (data, success, error) =>
  postPipe("api/module/searchNextVersion", data, success, error);
  
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
  getModuleList$
];
