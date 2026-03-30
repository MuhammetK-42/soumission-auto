'use client'

import { useLang } from './lib/LangContext'
import Navbar from './components/navbar'
import Link from 'next/link'

export default function Home() {
  const { t } = useLang()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
          Montréal, QC — Service rapide
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          {t.hero.title}{' '}
          <span className="text-orange-500">{t.hero.subtitle}</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/soumettre" className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition">
            {t.hero.cta}
          </Link>
          <a href="#comment" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition">
            {t.hero.learn}
          </a>
        </div>
      </section>

      <section className="border-y border-gray-800 py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {[
            { value: '24h', label: 'Délai de réponse' },
            { value: '100%', label: 'Gratuit' },
            { value: '0', label: 'Commission' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-extrabold text-orange-500">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="comment" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{t.steps.title}</h2>
          <p className="text-gray-400 text-lg">{t.steps.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: '01', ...t.steps.step1 },
            { num: '02', ...t.steps.step2 },
            { num: '03', ...t.steps.step3 },
          ].map((step) => (
            <div key={step.num} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <p className="text-orange-500 font-black text-4xl mb-4">{step.num}</p>
              <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">{t.why.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.why.items.map((item) => (
              <div key={item.title} className="bg-gray-950 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/30 transition">
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">{t.cta.title}</h2>
        <p className="text-gray-400 text-lg mb-10">{t.cta.subtitle}</p>
        <Link href="/soumettre" className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-10 py-5 rounded-xl text-xl transition inline-block">
          {t.cta.button}
        </Link>
      </section>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        {t.footer}
      </footer>
    </div>
  )
}