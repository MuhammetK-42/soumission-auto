import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from './lib/LangContext'

export const metadata: Metadata = {
  title: 'AutoSoumission',
  description: 'Vendez votre véhicule rapidement au Québec',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}