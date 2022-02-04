import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Todos from "../components/Todos";
import { changeInput, toggle, insert, remove } from '../modules/todos';
import useActions from '../lib/useActions';

const TodosContainer = () => {
  const {input, todos} = useSelector(({todos}) => ({
    input: todos.input,
    todos: todos.list,
  }));
  const dispatch = useDispatch();

  // useActions 사용하기
  // const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  // const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
  // const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
  // const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);
  const [onChangeInput, onToggle, onInsert, onRemove] = useActions(
    [changeInput, toggle, insert, remove], 
    []
  );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

// connect는 props가 바꾸지 않을때 리렌더링을 자동으로 방지해주지만 
// useSelector를 사용하는 경우 React.memo로 최적화 작업을 해주어야함
// export default TodosContainer;
export default React.memo(TodosContainer);