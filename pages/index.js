import { AppBar, Button, Toolbar } from "@mui/material";
import Head from "next/head";
import Link from "../src/Link";

export default function Home() {
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
      <div className="bg-[#f4f4f4] flex-1 flex justify-center items-center">
        <div className="grid gap-6">
          <div className="text-gray-500">할일을 추가해주세요!</div>
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
    </>
  );
}
