import {
  AppBar,
  Box,
  Button,
  Chip,
  Fab,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
  Zoom,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import classNames from "classnames";
import Head from "next/head";
import PropTypes from "prop-types";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useTodosState } from "../hooks";
import Link from "../src/Link";
import {
  Common__notiSnackBarAtom,
  TodoList__filterCompletedIndexAtom,
  TodoList__sortIndexAtom,
} from "../states";

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Home() {
  const { todos } = useTodosState();

  return (
    <>
      <Head>
        <title>홈 | TODO</title>
        <meta name="description" content="할일관리" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="fixed">
        <Toolbar>
          <div className="flex-1"></div>
          <Link href="/" noLinkStyle className="font-bold">
            HAPPY NOTE
          </Link>
          <div className="flex-1 flex justify-end">
            <Link href="/write" noLinkStyle>
              <i className="fa-solid fa-pen"></i>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      {todos.length == 0 && <TodosEmpty />}
      {todos.length > 0 && <TodoList />}
    </>
  );
}

function TodoList() {
  const { todos, toggleCompleted, removeTodo } = useTodosState();

  const [bottomDrawerTodoId, setBottomDrawerTodoId] = useState(null);

  const [notiSnackBar, setNotiSnackBar] = useRecoilState(
    Common__notiSnackBarAtom
  );

  const [filterCompletedIndex, setFilterCompletedIndex] = useRecoilState(
    TodoList__filterCompletedIndexAtom
  );

  const [sortIndex, setSortIndex] = useRecoilState(TodoList__sortIndexAtom);

  let filteredTodos = todos;

  let sortedTodos = filteredTodos;

  if (sortIndex == 0) {
    sortedTodos = [...sortedTodos].sort((a, b) => {
      return a.performDate < b.performDate ? -1 : 1;
    });
  } else if (sortIndex == 1) {
    sortedTodos = [...sortedTodos].sort((a, b) => {
      return a.performDate > b.performDate ? -1 : 1;
    });
  } else if (sortIndex == 3) {
    sortedTodos = [...sortedTodos].sort((a, b) => {
      return a.id > b.id ? -1 : 1;
    });
  }

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={bottomDrawerTodoId !== null}
        onOpen={() => {}}
        onClose={() => setBottomDrawerTodoId(null)}
      >
        <List>
          <ListItem className="items-baseline p-5">
            <span className="text-[color:var(--mui-color-primary-main)]">
              {bottomDrawerTodoId}번
            </span>
            <span>&nbsp;</span>
            <span>할일에 대해서</span>
          </ListItem>

          <Divider />

          <ListItem
            button
            component={Link}
            noLinkStyle
            href={`edit?id=${bottomDrawerTodoId}`}
            className="items-baseline p-5"
          >
            <i className="fa-solid fa-pen-to-square"></i>
            <span>&nbsp;</span>
            <span>수정</span>
          </ListItem>
          <ListItem
            button
            className="items-baseline p-5"
            onClick={() => {
              confirm("정말로 삭제하시겠습니까?") &&
                removeTodo(bottomDrawerTodoId);
              setBottomDrawerTodoId(null);
              setNotiSnackBar({
                open: true,
                msg: `${bottomDrawerTodoId}번 할일이 삭제되었습니다.`,
                severity: "success",
              });
            }}
          >
            <i className="fa-solid fa-trash-can"></i>
            <span>&nbsp;</span>
            <span>삭제 </span>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <div className="bg-[#f4f4f4] flex-1">
        <Tabs
          variant="fullWidth"
          value={filterCompletedIndex}
          onChange={(event, newValue) => setFilterCompletedIndex(newValue)}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <span className="flex items-baseline">
                <i className="fa-solid fa-list-ul"></i>
                <span className="ml-2">전체</span>
              </span>
            }
            value={0}
          />
          <Tab
            label={
              <span className="flex items-baseline">
                <i className="fa-regular fa-square"></i>
                <span className="ml-2">미완료</span>
              </span>
            }
            value={1}
          />
          <Tab
            label={
              <span className="flex items-baseline">
                <i className="fa-regular fa-square-check"></i>
                <span className="ml-2">완료</span>
              </span>
            }
            value={2}
          />
        </Tabs>
        <Tabs
          variant="scrollable"
          value={sortIndex}
          onChange={(event, newValue) => {
            setSortIndex(newValue);
          }}
          TabIndicatorProps={{
            className: "hidden",
          }}
        >
          <Tab
            className="flex-grow max-w-[none] px-4"
            label={
              <span className="flex items-baseline">
                <i className="fa-regular fa-face-sad-cry mr-2"></i>
                <span className="mr-2 whitespace-nowrap">급해요</span>
              </span>
            }
            value={0}
          />
          <Tab
            className="flex-grow max-w-[none] px-4"
            label={
              <span className="flex items-baseline">
                <i className="fa-regular fa-face-smile-wink mr-2"></i>
                <span className="mr-2 whitespace-nowrap">널널해요</span>
              </span>
            }
            value={1}
          />
          <Tab
            className="flex-grow max-w-[none] px-4"
            label={
              <span className="flex items-baseline">
                <i className="fa-solid fa-pen mr-2"></i>
                <span className="mr-2 whitespace-nowrap">작성순</span>
              </span>
            }
            value={2}
          />
          <Tab
            className="flex-grow max-w-[none] px-4"
            label={
              <span className="flex items-baseline">
                <i className="fa-regular fa-clock mr-2"></i>
                <span className="mr-2 whitespace-nowrap">최신순</span>
              </span>
            }
            value={3}
          />
        </Tabs>
        <ul>
          {sortedTodos.map((todo) => (
            <li
              key={todo.id}
              className={classNames(
                "mx-5 py-4 transition-all duration-[.7s] opacity-1",
                {
                  "opacity-0 invisible absolute":
                    (todo.completed && filterCompletedIndex == 1) ||
                    (!todo.completed && filterCompletedIndex == 2),
                }
              )}
            >
              <div>
                <div className="flex gap-3">
                  <Chip
                    label={`번호 : ${todo.id}`}
                    className="pt-1 rounded-[12px] text-[12px] border-[1.5px]"
                    variant="outlined"
                  />
                  <Chip
                    color="primary"
                    label={`기한 : ${todo.performDate}`}
                    className="pt-1 rounded-[12px] text-[12px] border-[1.5px]"
                    variant="outlined"
                  />
                </div>

                <div className="flex bg-white rounded-[20px] shadow mt-3">
                  <Button
                    color="inherit"
                    className="flex-shrink-0 rounded-[20px_0_0_20px] items-start"
                    onClick={() => toggleCompleted(todo.id)}
                  >
                    <span
                      className={classNames(
                        "min-h-[80px] flex items-center text-4xl",
                        { "text-[#ff8686]": todo.completed },
                        { "text-[#dcdcdc]": !todo.completed }
                      )}
                    >
                      <i className="fa-solid fa-check"></i>
                    </span>
                  </Button>
                  <div className="flex-shrink-0 w-[2px] my-5 mr-5 bg-[#dcdcdc]"></div>
                  <div className="text-[15px] text-[#565656] py-5 flex-grow leading-relaxed flex items-center whitespace-pre-line">
                    {todo.body}
                  </div>
                  <Button
                    onClick={() => setBottomDrawerTodoId(todo.id)}
                    color="inherit"
                    className="flex-shrink-0 rounded-[0_20px_20px_0] items-start"
                  >
                    <span className="min-h-[80px] flex items-center text-2xl text-[#dcdcdc]">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </span>
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <i className="fa-solid fa-arrow-up"></i>
        </Fab>
      </ScrollTop>
    </>
  );
}

function TodosEmpty() {
  return (
    <div className="bg-[#f4f4f4] flex-1 flex justify-center items-center">
      <div className="grid gap-6">
        <div className="text-gray-500">
          <span className="text-[color:var(--mui-color-primary-main)]">
            할일
          </span>
          을 추가해주세요!
        </div>
        <Button
          size="large"
          variant="contained"
          className="rounded-[30px] px-[30px] py-[15px]"
          component={Link}
          noLinkStyle
          href="/write"
        >
          할일 추가하기
        </Button>
      </div>
    </div>
  );
}
