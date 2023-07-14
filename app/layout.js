
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.scss'
import { Inter } from 'next/font/google'
import Header from "./components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}



export default function RootLayout({ children }) {
  
  return (
    <UserProvider>
      <html lang="en">
        <body>
            <Header/>
            {children}
          </body>
      </html>
    </UserProvider>
  )
}
