import { UserInfoProvider } from "@/states/UserInfoContext";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Notary Management System</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <UserInfoProvider>
        <Component {...pageProps} />
      </UserInfoProvider>
    </>
  );
}
