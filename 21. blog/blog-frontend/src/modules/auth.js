import { createAction, handleActions } from 'redux-actions';

const CAHNGE_FIELD = 'auth/CHANGE_FIELD';
const INITALIZE_FORM = 'auth/INITALIZE_FORM';

export const changeField = createAction(
  CAHNGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITALIZE_FORM, form => form); // register / login

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
    })
  },
  initialState,
);

export default auth;
