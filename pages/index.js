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

      <Button variant="contained">버튼</Button>

      <div className="w-[100px] h-[100px] bg-red-500"></div>
    </>
  );
}
