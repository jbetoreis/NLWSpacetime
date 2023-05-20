import './globals.css'
import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as Jamjuree,
} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const jamjuree = Jamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-jamjuree',
})

export const metadata = {
  title: 'NLW SpaceTime',
  description: 'Capsula do Tempo Desenvolvida com o Ecosistema Javascript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${jamjuree.variable} bg-black font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
