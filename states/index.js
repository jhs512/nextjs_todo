import { atom } from "recoil";
import { useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const ssrCompletedState = atom({
  key: "SsrCompleted",
  default: false,
});

const { persistAtom: persistAtomCommon } = recoilPersist({
  key: "recoil-persist-common",
});

const { persistAtom: persistAtomTodos } = recoilPersist({
  key: "recoil-persist-todos",
});

const persistAtomCommonEffect = function (param) {
  param.getPromise(ssrCompletedState).then(function () {
    return persistAtomCommon(param);
  });
};

const persistAtomTodosEffect = function (param) {
  param.getPromise(ssrCompletedState).then(function () {
    return persistAtomTodos(param);
  });
};

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

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
