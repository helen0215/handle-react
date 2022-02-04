import { createAction, handleActions } from "redux-actions";
import produce from 'immer';

const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

let id = 3;

/*
export const changeInput = input => ({
  type: CHANGE_INPUT,
  input
});
*/

export const changeInput = createAction(CHANGE_INPUT, input => input);

/*
export const insert = text => ({
  type: INSERT,
  todo: {
    id: id++,
    text,
    done: false
  }
});
*/

export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false
}));

/*
export const toggle = id => ({
  type: TOGGLE,
  id
});
*/

export const toggle = createAction(TOGGLE, id => id);

/*
export const remove = id => ({
  type: REMOVE,
  id
});
*/

export const remove = createAction(REMOVE, id => id);

const initialState = {
  input: '',
  list: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false
    }
  ]
};

/*
function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input
      };
    case INSERT:
      return {
        ...state,
        list: state.list.concat(action.todo)
      };
    case TOGGLE:
      return {
        ...state,
        list: state.list.map(todo => 
          todo.id === action.id ? {...todo, done: !todo.done} : todo
        )
      };
    case REMOVE:
      return {
        ...state,
        list: state.list.filter(todo => todo.id !== action.id)
      };
    default:
      return state;
  }
}
*/

//action이 아라 payload로 받아야함
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, {payload: input}) =>
      // ({...state, input}),
      // immer 사용해보기 
      produce(state, draft => {
        draft.input = input
      }),
    [INSERT]: (state, {payload: todo}) => ({
      ...state, 
      list: state.list.concat(todo)
    }),
    [TOGGLE]: (state, {payload: id}) => ({
      ...state, 
      list: state.list.map(todo => 
        todo.id === id ? {...todo, done: !todo.done} : todo)
      }),
    [REMOVE]: (state, {payload: id}) =>({
      ...state,
      list: state.list.filter(todo => todo.id !== id)
    }),
  },
  initialState,
);

export default todos;