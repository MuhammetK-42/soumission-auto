'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-white">
          Soumission<span className="text-orange-500">Auto</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition">Accueil</Link>
          <Link href="/apropos" className="hover:text-white transition">À propos</Link>
          <Link href="/soumettre"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl transition">
            Obtenir une soumission
          </Link>
        </div>

        {/* Mobile Burger */}
        <button
          className="sm:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-800 px-4 py-4 flex flex-col gap-4 text-sm text-gray-400 bg-gray-950">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-white transition">Accueil</Link>
          <Link href="/apropos" onClick={() => setMenuOpen(false)} className="hover:text-white transition">À propos</Link>
          <Link href="/soumettre" onClick={() => setMenuOpen(false)}
            className="bg-orange-500 text-white font-bold px-5 py-2 rounded-xl text-center transition">
            Obtenir une soumission
          </Link>
        </div>
      )}
    </nav>
  )
}
