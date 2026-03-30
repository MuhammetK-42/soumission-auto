'use client'

import { useLang } from '../lib/LangContext'
import Navbar from '../components/navbar'
import Link from 'next/link'

export default function Apropos() {
  const { t } = useLang()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{t.apropos.title}</h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-14 max-w-2xl">{t.apropos.description}</p>
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {t.apropos.values.map((v) => (
            <div key={v.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-2">{v.title}</h3>
              <p className="text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/soumettre" className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition inline-block">
          {t.apropos.cta}
        </Link>
      </section>
    </div>
  )
}