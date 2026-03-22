import Link from 'next/link'
import Navbar from './components/navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-block bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-4 py-1 rounded-full mb-6">
            ⭐ Plus de 50 voitures achetées à Montréal
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight">
            Vendez votre auto<br />
            <span className="text-orange-500">sans perdre votre temps.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Plus besoin de publier sur Marketplace, répondre à 100 messages et gérer des no-show. On s'occupe de tout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/soumettre"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition">
              Obtenir ma soumission gratuite →
            </Link>
            <Link href="/apropos"
              className="border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white font-bold px-8 py-4 rounded-2xl text-lg transition">
              En savoir plus
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>✅ 100% gratuit</span>
            <span>🤝 Sans engagement</span>
            <span>⏱ Réponse en 24h</span>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="border-t border-gray-800 py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-2">Comment ça marche ?</h2>
            <p className="text-gray-400 text-center mb-12">Simple, rapide et sans stress.</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { num: '1', icon: '📋', titre: 'Soumettez votre véhicule', desc: 'Remplissez notre formulaire en 2 minutes avec les détails et photos de votre voiture.' },
                { num: '2', icon: '🔍', titre: 'On évalue votre auto', desc: 'Notre équipe analyse votre soumission et prépare une offre juste basée sur le marché.' },
                { num: '3', icon: '💰', titre: 'Recevez votre offre', desc: 'On vous contacte en moins de 24h avec une offre claire. Vous êtes libre d\'accepter ou refuser.' },
              ].map(s => (
                <div key={s.num} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-orange-500/50 transition">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <div className="w-8 h-8 bg-orange-500 rounded-full text-white text-sm font-bold flex items-center justify-center mx-auto mb-4">{s.num}</div>
                  <h3 className="text-white font-bold mb-2">{s.titre}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi nous */}
        <section className="border-t border-gray-800 py-20 px-4 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-2">Pourquoi choisir SoumissionAuto ?</h2>
            <p className="text-gray-400 text-center mb-12">On rend la vente de voiture simple et honnête.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '⚡', titre: 'Rapide', desc: 'Offre reçue en moins de 24h, pas de semaines d\'attente.' },
                { icon: '💯', titre: 'Offre honnête', desc: 'Prix basé sur le vrai marché, pas d\'arnaque ni de lowball.' },
                { icon: '🔒', titre: 'Confidentiel', desc: 'Vos informations restent privées et ne sont jamais partagées.' },
                { icon: '🚫', titre: 'Zéro stress', desc: 'Pas de négociation, pas de no-show, pas de perte de temps.' },
              ].map(r => (
                <div key={r.titre} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-orange-500/30 transition">
                  <span className="text-3xl">{r.icon}</span>
                  <div>
                    <h3 className="text-white font-bold mb-1">{r.titre}</h3>
                    <p className="text-gray-500 text-sm">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="border-t border-gray-800 py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-2">Ce que disent nos clients</h2>
            <p className="text-gray-400 text-center mb-12">Des vraies personnes, des vraies expériences.</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { nom: 'Jean-François L.', ville: 'Montréal', texte: 'Vendu mon Honda Civic en moins de 18h ! Processus super simple et offre très honnête.', etoiles: 5 },
                { nom: 'Samira B.', ville: 'Laval', texte: 'J\'avais essayé Marketplace pendant 3 semaines sans succès. Ici j\'ai eu une offre le lendemain !', etoiles: 5 },
                { nom: 'Marco T.', ville: 'Longueuil', texte: 'Rapide, professionnel et sans prise de tête. Le meilleur moyen de vendre son auto.', etoiles: 5 },
              ].map((t, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-orange-500/30 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                      {t.nom[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.nom}</p>
                      <p className="text-gray-500 text-xs">{t.ville}</p>
                    </div>
                    <div className="ml-auto text-yellow-400 text-xs">{'⭐'.repeat(t.etoiles)}</div>
                  </div>
                  <p className="text-gray-400 text-sm italic">"{t.texte}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="border-t border-gray-800 py-20 px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-4">Prêt à vendre votre auto ?</h2>
            <p className="text-gray-400 mb-8">Ça prend 2 minutes. C'est gratuit. Sans engagement.</p>
            <Link href="/soumettre"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-2xl text-lg transition">
              Obtenir ma soumission gratuite →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <p className="text-gray-600 text-sm">© 2026 SoumissionAuto · Montréal, QC</p>
        <p className="text-gray-700 text-xs mt-1">🔒 Vos données sont protégées et ne sont jamais revendues.</p>
      </footer>
    </div>
  )
}
