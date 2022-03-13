import { useRecoilState } from "recoil";
import { todosAtom, todosLastIdAtom } from "../states";
import produce from "immer";

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
    setTodos([...todos, newTodo]);
  };

  const toggleCompleted = (id) => {
    const newTodos = produce(todos, (draft) => {
      const index = draft.findIndex((todo) => todo.id == id);

      draft[index].completed = !draft[index].completed;
    });
    setTodos(newTodos);
  };

  return {
    todos,
    writeTodo,
    todosLastId,
    toggleCompleted,
  };
}
