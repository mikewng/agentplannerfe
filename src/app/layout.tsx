'use client'

import "./App.scss"

import { NavigationProvider } from "../app/context/navigationContext";
import { AuthProvider } from "./context/authContext";

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
        <AuthProvider>
          <NavigationProvider>
            {children}
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
