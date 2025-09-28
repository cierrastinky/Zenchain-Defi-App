import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ReduxProvider } from "@/redux/ReduxProvider";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zenchain Private DeFi',
  description: 'Zenchain for Private DeFi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js" 
          strategy="beforeInteractive" 
        />

        <Script 
          src="https://unpkg.com/tfhe@0.7.0/tfhe.js" 
          strategy="beforeInteractive" 
        />
        <ReduxProvider>{children}</ReduxProvider>
        
      </body>
    </html>
  )
}
