/* eslint-disable @next/next/no-page-custom-font */
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "~/server/api/root";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};
export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: "/api/trpc",
          headers: () => {
            return {
              Authorization:
                typeof window === "undefined"
                  ? ""
                  : localStorage.getItem("token") ?? "",
            };
          },
        }),
      ],
      transformer: SuperJSON,
    };
  },
})(MyApp);

// export default api.withTRPC(MyApp);
