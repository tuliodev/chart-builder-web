import type { AppProps } from "next/app";

import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { DatasourceContextProvider } from "@/contexts/Datasource";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DatasourceContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DatasourceContextProvider>
  );
}
