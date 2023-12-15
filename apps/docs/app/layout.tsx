import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { MantineProvider, createTheme } from "@mantine/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

import "@mantine/core/styles.css";
import "./globals.css";
import "@uploadthing/react/styles.css";
import { ModalProvider } from "../components/providers/model-provider";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <ModalProvider />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
