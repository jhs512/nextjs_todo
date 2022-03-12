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
              <i class="fa-solid fa-pen"></i>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
