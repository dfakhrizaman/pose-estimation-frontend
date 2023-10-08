import LoggedInContainer from "@/components/AppShell";
import { UserInfoProvider } from "@/states/UserInfoContext";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Fitness Assistant</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <UserInfoProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          {router.pathname.includes("login") ||
          router.pathname.includes("register") ? (
            <Component {...pageProps} />
          ) : (
            <LoggedInContainer>
              <Component {...pageProps} />
            </LoggedInContainer>
          )}
        </MantineProvider>
      </UserInfoProvider>
    </>
  );
}
