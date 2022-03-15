import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: persistAtomCommon } = recoilPersist({
  key: "recoil-persist-common",
});

const { persistAtom: persistAtomTodos } = recoilPersist({
  key: "recoil-persist-todos",
});

const persistAtomCommonEffect = persistAtomCommon;
const persistAtomTodosEffect = persistAtomTodos;

export const TodoWrite__performDateInputValueAtom = atom({
  key: "app/TodoWrite__performDateInputValueAtom",
  default: null,
  effects_UNSTABLE: [persistAtomCommonEffect],
});

export const TodoWrite__bodyInputValueAtom = atom({
  key: "app/TodoWrite__bodyInputValueAtom",
  default: "",
  effects_UNSTABLE: [persistAtomCommonEffect],
});

export const TodoList__filterCompletedIndexAtom = atom({
  key: "app/TodoList__filterCompletedIndexAtom",
  default: 1,
  effects_UNSTABLE: [persistAtomCommonEffect],
});

export const TodoList__sortIndexAtom = atom({
  key: "app/TodoList__sortIndexAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommonEffect],
});

export const todosAtom = atom({
  key: "app/todosAtom",
  default: [],
  effects_UNSTABLE: [persistAtomTodosEffect],
});

export const todosLastIdAtom = atom({
  key: "app/todosLastIdAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomTodosEffect],
});

export const Common__notiSnackBarAtom = atom({
  key: "app/Common__notiSnackBarAtom",
  default: {
    open: false,
    msg: "",
    severity: "success",
  },
});
