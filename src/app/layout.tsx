'use client'

import "./App.scss"
import "./util/mockchatapi";

import { NavigationProvider } from "../app/context/navigationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>EVA Calendar Agent</title>
      </head>
      <body>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
