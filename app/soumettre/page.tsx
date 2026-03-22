'use client'

import { useState } from 'react'
import Navbar from '../components/navbar'
import { supabase } from '../lib/supabase'

export default function Soumettre() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    marque: '', modele: '', annee: '', kilometrage: '',
    transmission: '', carburant: '', condition: '',
    nom: '', telephone: '', email: '', ville: '', notes: ''
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + photos.length > 6) {
      alert('Maximum 6 photos')
      return
    }
    setPhotos(prev => [...prev, ...files])
    const newPreviews = files.map(f => URL.createObjectURL(f))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Upload photos
      const photoUrls: string[] = []
      for (const photo of photos) {
        const fileName = `${Date.now()}-${photo.name}`
        const { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(fileName, photo)
        if (!uploadError) {
          const { data } = supabase.storage.from('photos').getPublicUrl(fileName)
          photoUrls.push(data.publicUrl)
        }
      }

      // Insert soumission
      const { error } = await supabase.from('soumissions').insert([{
        marque: form.marque,
        modele: form.modele,
        annee: form.annee,
        kilometrage: form.kilometrage,
        transmission: form.transmission,
        carburant: form.carburant,
        condition: form.condition,
        notes: form.notes,
        nom: form.nom,
        telephone: form.telephone,
        email: form.email,
        ville: form.ville,
        photos: photoUrls,
      }])

      if (error) {
        alert('Erreur: ' + JSON.stringify(error))
      } else {
        setSubmitted(true)
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-extrabold mb-3">Soumission envoyée !</h1>
      <p className="text-gray-400 max-w-md">On va analyser votre véhicule et vous contacter dans les prochaines <strong className="text-white">24 heures</strong> avec une offre.</p>
      <a href="/" className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-2xl transition">
        Retour à l'accueil
      </a>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-2">Soumettez votre véhicule</h1>
        <p className="text-gray-400 text-center mb-10">Gratuit · Sans engagement · Réponse en 24h</p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${step >= s ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-500'}`}>{s}</div>
              <span className="text-xs text-gray-500">{s === 1 ? 'Véhicule' : s === 2 ? 'Détails' : 'Contact'}</span>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          {/* Étape 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">🚗 Votre véhicule</h2>
              {[
                { label: 'Marque', key: 'marque', placeholder: 'ex: Toyota' },
                { label: 'Modèle', key: 'modele', placeholder: 'ex: Camry' },
                { label: 'Année', key: 'annee', placeholder: 'ex: 2019' },
                { label: 'Kilométrage', key: 'kilometrage', placeholder: 'ex: 85000' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={e => update(f.key, e.target.value)}
                  />
                </div>
              ))}
              <button
                disabled={!form.marque || !form.modele || !form.annee || !form.kilometrage}
                onClick={() => setStep(2)}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl mt-2 transition">
                Continuer →
              </button>
            </div>
          )}

          {/* Étape 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">🔧 Détails du véhicule</h2>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Transmission</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Automatique', 'Manuelle'].map(o => (
                    <button key={o} onClick={() => update('transmission', o)}
                      className={`py-3 rounded-xl border font-semibold transition text-sm ${form.transmission === o ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Carburant</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Essence', 'Diesel', 'Hybride', 'Électrique', 'Autre'].map(o => (
                    <button key={o} onClick={() => update('carburant', o)}
                      className={`py-3 rounded-xl border font-semibold transition text-sm ${form.carburant === o ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Condition générale</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Excellente', 'Bonne', 'Passable', 'Mauvaise'].map(o => (
                    <button key={o} onClick={() => update('condition', o)}
                      className={`py-3 rounded-xl border font-semibold transition text-sm ${form.condition === o ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photos */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Photos du véhicule <span className="text-gray-600">(optionnel, max 6)</span></label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-orange-500 transition bg-gray-800/50">
                  <span className="text-2xl mb-1">📷</span>
                  <span className="text-sm text-gray-400">Cliquez pour ajouter des photos</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotos} />
                </label>
                {previews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {previews.map((src, i) => (
                      <div key={i} className="relative group">
                        <img src={src} className="w-full h-24 object-cover rounded-xl" />
                        <button
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Notes supplémentaires (optionnel)</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition resize-none"
                  rows={3} placeholder="Accidents, réparations récentes, équipements..."
                  value={form.notes} onChange={e => update('notes', e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-700 text-gray-400 hover:text-white font-bold py-3 rounded-xl transition">← Retour</button>
                <button
                  disabled={!form.transmission || !form.carburant || !form.condition}
                  onClick={() => setStep(3)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition">
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* Étape 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">📞 Vos coordonnées</h2>
              {[
                { label: 'Nom complet', key: 'nom', placeholder: 'Jean Tremblay' },
                { label: 'Téléphone', key: 'telephone', placeholder: '514-xxx-xxxx' },
                { label: 'Courriel', key: 'email', placeholder: 'jean@email.com' },
                { label: 'Ville', key: 'ville', placeholder: 'Montréal' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={e => update(f.key, e.target.value)}
                  />
                </div>
              ))}
              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(2)} className="flex-1 border border-gray-700 text-gray-400 hover:text-white font-bold py-3 rounded-xl transition">← Retour</button>
                <button
                  disabled={!form.nom || !form.telephone || !form.email || loading}
                  onClick={handleSubmit}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition">
                  {loading ? 'Envoi en cours...' : 'Envoyer ma soumission 🚀'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
