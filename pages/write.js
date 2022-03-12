import { AppBar, Button, TextField, Toolbar } from "@mui/material";
import Head from "next/head";
import Link from "../src/Link";

export default function Home() {
  return (
    <>
      <Head>
        <title>할일 작성 | TODO</title>
        <meta name="description" content="할일관리" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="fixed">
        <Toolbar>
          <div className="flex-1"></div>
          <Link href="/" noLinkStyle className="font-bold">
            HAPPY NOTE
          </Link>
          <div className="flex-1 flex justify-end"></div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div className="flex-1 flex flex-col p-10 gap-6">
        <TextField
          className="flex-1 flex flex-col"
          InputProps={{ className: " flex-1 flex flex-col" }}
          inputProps={{ className: " flex-1" }}
          label="할일"
          placeholder="할일"
          multiline
        />
        <Button variant="contained">
          <span>할일추가</span>
          <span>&nbsp;</span>
          <i className="fa-solid fa-marker"></i>
        </Button>
      </div>
    </>
  );
}
