import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/saga/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

const CAHNGE_FIELD = 'auth/CHANGE_FIELD';
const INITALIZE_FORM = 'auth/INITALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

export const changeField = createAction(
  CAHNGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITALIZE_FORM, form => form); // register / login

export const register = createAction(REGISTER, ({username, password}) => ({
  username,
  password,
}));

export const login = createAction(LOGIN, ({username, password}) => ({
  username,
  password,
}));

// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CAHNGE_FIELD]: (state, {payload: {form, key, value}}) => ({
      ...state,
      [form]: {
        ...state[form],
        [key]: value
      }
    }),
    [INITALIZE_FORM]: (state, {payload: form}) => ({
      ...state,
      [form]: {
        ...initialState[form]
      }
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, {payload: error}) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, {payload: error}) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
