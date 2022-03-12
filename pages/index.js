import { Button } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TODO</title>
        <meta name="description" content="할일관리" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button variant="outlined">버튼</Button>
    </>
  );
}
