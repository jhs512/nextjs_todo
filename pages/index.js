import { AppBar, Button, Chip, Toolbar } from "@mui/material";
import Head from "next/head";
import { useTodosState } from "../hooks";
import Link from "../src/Link";

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
      <Toolbar />
      {todos.length == 0 && <TodosEmpty />}
      {todos.length > 0 && <TodoList />}
    </>
  );
}

function TodoList() {
  const { todos } = useTodosState();

  return (
    <div className="bg-[#f4f4f4] flex-1">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mx-5 py-4">
            <div>
              <Chip
                color="primary"
                label={`기한 : ${todo.performDate}`}
                className="pt-1 rounded-[12px] text-[12px] border-[1.5px]"
                variant="outlined"
              />

              <div className="flex bg-white rounded-[20px] shadow mt-3">
                <Button
                  color="inherit"
                  className="flex-shrink-0 rounded-[20px_0_0_20px] items-start"
                >
                  <span className="min-h-[80px] flex items-center text-4xl text-[#dcdcdc] ">
                    <i className="fa-solid fa-check"></i>
                  </span>
                </Button>
                <div className="flex-shrink-0 w-[2px] my-5 mr-5 bg-[#dcdcdc]"></div>
                <div className="text-[15px] text-[#565656] py-5 flex-grow leading-relaxed flex items-center whitespace-pre-line">
                  {todo.body}
                </div>
                <Button
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
