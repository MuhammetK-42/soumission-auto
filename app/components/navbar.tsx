'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useLang } from '../lib/LangContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { lang, t, toggleLang } = useLang()
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/apropos', label: t.nav.about },
  ]

  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight">
          <span className="text-white">Auto</span>
          <span className="text-orange-500">Soumission</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={`text-sm transition ${pathname === link.href ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>
              {link.label}
            </Link>
          ))}
          <button onClick={toggleLang} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            className="text-sm font-bold border border-gray-700 hover:border-orange-500 text-gray-400 hover:text-orange-400 px-3 py-1.5 rounded-lg transition">
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link href="/soumettre"
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition">
            {t.nav.submit}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleLang} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            className="text-xs font-bold border border-gray-700 hover:border-orange-500 text-gray-400 hover:text-orange-400 px-2.5 py-1 rounded-lg transition">
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button onClick={() => setOpen(!open)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open}
            className="text-gray-400 hover:text-white transition p-1">
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-800 px-6 py-4 flex flex-col gap-4 bg-gray-950">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className={`text-base transition ${pathname === link.href ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/soumettre" onClick={() => setOpen(false)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl text-center transition mt-2">
            {t.nav.submit}
          </Link>
        </div>
      )}
    </nav>
  )
}