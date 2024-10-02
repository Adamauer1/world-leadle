import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  MantineProvider,
} from "@mantine/core";
import Header from "@/components/ui/Header";
import { HardModeProvider } from "@/contexts/HardModeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Leadle",
  description: "A game to guess the leader based on their picture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="dark">
          <HardModeProvider>
            <AppShell
              header={{ height: { base: 40, xs: 50, md: 60, lg: 70, xl: 70 } }}
            >
              <AppShellHeader>
                <Header />
              </AppShellHeader>
              <AppShellMain>{children}</AppShellMain>
            </AppShell>
          </HardModeProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
