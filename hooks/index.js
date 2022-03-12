import { useRecoilState } from "recoil";
import { todosAtom, todosLastIdAtom } from "../states";

export function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [todosLastId, setTodosLastId] = useRecoilState(todosLastIdAtom);

  const writeTodo = (performDate, body) => {
    const id = todosLastId + 1;
    const newTodo = {
      id,
      performDate,
      body,
    };

    setTodosLastId(id);
    setTodos([...todos, newTodo]);
  };

  return {
    todos,
    writeTodo,
    todosLastId,
  };
}
