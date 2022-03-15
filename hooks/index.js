import produce from "immer";
import { useRecoilState } from "recoil";
import { todosAtom, todosLastIdAtom } from "../states";

export function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [todosLastId, setTodosLastId] = useRecoilState(todosLastIdAtom);

  const writeTodo = (performDate, body) => {
    const id = todosLastId + 1;

    const completed = false;

    const newTodo = {
      id,
      performDate,
      body,
      completed,
    };

    setTodosLastId(id);

    const newTodos = produce(todos, (draft) => {
      draft.push(newTodo);
    });

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = produce(todos, (draft) => {
      const index = draft.findIndex((todo) => todo.id == id);

      draft.splice(index, 1);
    });

    setTodos(newTodos);
  };

  const toggleCompleted = (id) => {
    const newTodos = produce(todos, (draft) => {
      const index = draft.findIndex((todo) => todo.id == id);

      draft[index].completed = !draft[index].completed;
    });
    setTodos(newTodos);
  };

  const modifyTodo = (id, performDate, body) => {
    const newTodos = produce(todos, (draft) => {
      const index = draft.findIndex((todo) => todo.id == id);

      draft[index].performDate = performDate;
      draft[index].body = body;
    });

    setTodos(newTodos);
  };

  const findTodoById = (id) => {
    console.log("todos : " + todos);
    return todos.find((todo) => todo.id == id);
  };

  return {
    todos,
    writeTodo,
    toggleCompleted,
    removeTodo,
    findTodoById,
    modifyTodo,
  };
}
