/* eslint-disable react-hooks/exhaustive-deps */
import { useUserInfo } from "@/states/UserInfoContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { userInfo } = useUserInfo();

  return (
    <>
      <Head>
        <title>Fitness Assistant</title>
        <meta name="description" content="A system for notary management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Loading</main>
    </>
  );
}
