import { createAction, handleActions } from 'redux-actions';

// actions
export const setUser = createAction('setUser');
export const setLinkAddrs = createAction('setLinkAddrs');

/*
 * reducer 相关
 */
const common = handleActions({
  setUser: (state, action) => {
    const { uid, email } = action.payload;
    return {
      uid,
      email,
      isLogined: true,
    };
  }
}, {
  uid: '',
  email: '',
  // uid: '70',
  // email: 'chenglong@tuya.com',
  isLogined: false,
  }
);


export const reducers = {
  common
};

/*
 * epic 相关
 */
export const epics = [];
