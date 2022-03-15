import { MobileDatePicker } from "@mui/lab";
import { AppBar, Button, TextField, Toolbar } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useTodosState } from "../hooks";
import Link from "../src/Link";
import {
  Common__notiSnackBarAtom,
  TodoWrite__bodyInputValueAtom,
  TodoWrite__performDateInputValueAtom,
} from "../states";
import { momentToFormat2 } from "../utils";

export default function Write() {
  const router = useRouter();

  const [notiSnackBar, setNotiSnackBar] = useRecoilState(
    Common__notiSnackBarAtom
  );

  const { writeTodo } = useTodosState();

  const [performDateInputValue, setPerformDateInputValue] = useRecoilState(
    TodoWrite__performDateInputValueAtom
  );

  const [bodyInputValue, setBodyInputValue] = useRecoilState(
    TodoWrite__bodyInputValueAtom
  );

  const onSubmit = () => {
    if (!performDateInputValue || performDateInputValue.trim().length == 0) {
      alert("언제 해야하는 일인지 날짜를 적어주세요.");
      return;
    }

    if (!bodyInputValue || bodyInputValue.trim().length == 0) {
      alert("할일 내용을 입력해주세요.");
      return;
    }

    writeTodo(performDateInputValue.trim(), bodyInputValue.trim());

    setPerformDateInputValue(null);
    setBodyInputValue("");

    setNotiSnackBar({
      open: true,
      msg: "할일이 작성되었습니다.",
      severity: "success",
    });

    router.replace("/");
  };

  return (
    <>
      <Head>
        <title>할일 작성 | TODO</title>
        <meta name="description" content="할일관리" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="fixed">
        <Toolbar>
          <Link href="/" noLinkStyle className="font-bold">
            HAPPY NOTE
          </Link>
          <div className="flex-1"></div>
          <div className="flex self-stretch ">
            <Button color="inherit" href="/" noLinkStyle component={Link}>
              다음에 이어서
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div className="flex-1 flex flex-col p-10 gap-6">
        <MobileDatePicker
          value={performDateInputValue}
          onChange={(newValue) =>
            setPerformDateInputValue(momentToFormat2(newValue))
          }
          label="언제 해야하나요?"
          inputFormat={"yyyy-MM-DD"}
          mask={"____-__-__"}
          renderInput={(params) => <TextField {...params} />}
          toolbarFormat="yyyy. MM"
          okText="확인"
          cancelText="취소"
        />

        <TextField
          className="flex-1 flex flex-col"
          InputProps={{ className: " flex-1 flex flex-col" }}
          inputProps={{ className: " flex-1" }}
          label="무엇을 해야 하나요?"
          placeholder="무엇을 해야 하나요?"
          multiline
          value={bodyInputValue}
          onChange={({ target: { value } }) => setBodyInputValue(value)}
        />
        <Button variant="contained" onClick={onSubmit}>
          <span>할일추가</span>
          <span>&nbsp;</span>
          <i className="fa-solid fa-marker"></i>
        </Button>
      </div>
    </>
  );
}
