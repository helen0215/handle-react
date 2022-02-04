import { connect } from "react-redux";
import Todos from "../components/Todos";
import { changeInput, toggle, insert, remove } from '../modules/todos';

const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => {
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={changeInput}
      onInsert={insert}
      onToggle={toggle}
      onRemove={remove}
    />
  );
};

export default connect(
  ({todos}) => ({
    input: todos.input,
    todos: todos.list,
  }),
  {
    changeInput,
    insert,
    toggle,
    remove,  
  }
)(TodosContainer);