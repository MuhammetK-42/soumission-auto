'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Soumission = {
  id: string
  created_at: string
  marque: string
  modele: string
  annee: string
  kilometrage: string
  transmission: string
  carburant: string
  condition: string
  notes: string
  nom: string
  telephone: string
  email: string
  ville: string
  statut: string
  photos: string[]
}

const STATUTS = ['nouveau', 'en cours', 'offre envoyée', 'complété', 'refusé']

const STATUT_COLORS: Record<string, string> = {
  'nouveau': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'en cours': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'offre envoyée': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'complété': 'bg-green-500/20 text-green-400 border-green-500/30',
  'refusé': 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function Admin() {
  const [soumissions, setSoumissions] = useState<Soumission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Soumission | null>(null)
  const [filter, setFilter] = useState('tous')

  useEffect(() => {
    fetchSoumissions()
  }, [])

  const fetchSoumissions = async () => {
    const { data } = await supabase
      .from('soumissions')
      .select('*')
      .order('created_at', { ascending: false })
    setSoumissions(data || [])
    setLoading(false)
  }

  const updateStatut = async (id: string, statut: string) => {
    await supabase.from('soumissions').update({ statut }).eq('id', id)
    setSoumissions(prev => prev.map(s => s.id === id ? { ...s, statut } : s))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, statut } : null)
  }

  const filtered = filter === 'tous' ? soumissions : soumissions.filter(s => s.statut === filter)

  const stats = {
    total: soumissions.length,
    nouveau: soumissions.filter(s => s.statut === 'nouveau').length,
    enCours: soumissions.filter(s => s.statut === 'en cours').length,
    complete: soumissions.filter(s => s.statut === 'complété').length,
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold">SoumissionAuto <span className="text-orange-500">Admin</span></h1>
          <p className="text-gray-500 text-xs">Dashboard des soumissions</p>
        </div>
        <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Retour au site</a>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-white' },
            { label: 'Nouveaux', value: stats.nouveau, color: 'text-blue-400' },
            { label: 'En cours', value: stats.enCours, color: 'text-yellow-400' },
            { label: 'Complétés', value: stats.complete, color: 'text-green-400' },
          ].map(s => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
              <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['tous', ...STATUTS].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition capitalize ${filter === f ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Liste + Détail */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Liste */}
          <div className="space-y-3">
            {loading ? (
              <div className="text-center text-gray-500 py-12">Chargement...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-gray-500 py-12">Aucune soumission</div>
            ) : filtered.map(s => (
              <div key={s.id}
                onClick={() => setSelected(s)}
                className={`bg-gray-900 border rounded-2xl p-4 cursor-pointer transition hover:border-orange-500/50 ${selected?.id === s.id ? 'border-orange-500' : 'border-gray-800'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">{s.marque} {s.modele} <span className="text-gray-500 font-normal">{s.annee}</span></p>
                    <p className="text-gray-400 text-sm">{s.nom} · {s.ville}</p>
                    <p className="text-gray-600 text-xs mt-1">{new Date(s.created_at).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize shrink-0 ${STATUT_COLORS[s.statut] || STATUT_COLORS['nouveau']}`}>
                    {s.statut}
                  </span>
                </div>
                {s.photos?.length > 0 && (
                  <p className="text-gray-600 text-xs mt-2">📷 {s.photos.length} photo(s)</p>
                )}
              </div>
            ))}
          </div>

          {/* Détail */}
          {selected ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 lg:sticky lg:top-6 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-extrabold text-lg">{selected.marque} {selected.modele} {selected.annee}</h2>
                <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white">✕</button>
              </div>

              {/* Photos */}
              {selected.photos?.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {selected.photos.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noreferrer">
                      <img src={url} className="w-full h-20 object-cover rounded-xl hover:opacity-80 transition" />
                    </a>
                  ))}
                </div>
              )}

              {/* Infos véhicule */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: 'Kilométrage', value: `${selected.kilometrage} km` },
                  { label: 'Transmission', value: selected.transmission },
                  { label: 'Carburant', value: selected.carburant },
                  { label: 'Condition', value: selected.condition },
                ].map(item => (
                  <div key={item.label} className="bg-gray-800 rounded-xl p-3">
                    <p className="text-gray-500 text-xs">{item.label}</p>
                    <p className="text-white text-sm font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {selected.notes && (
                <div className="bg-gray-800 rounded-xl p-3 mb-4">
                  <p className="text-gray-500 text-xs mb-1">Notes</p>
                  <p className="text-gray-300 text-sm">{selected.notes}</p>
                </div>
              )}

              {/* Contact */}
              <div className="border-t border-gray-800 pt-4 mb-4">
                <p className="text-gray-500 text-xs mb-2">Contact</p>
                <p className="font-semibold">{selected.nom}</p>
                <a href={`tel:${selected.telephone}`} className="text-orange-400 text-sm hover:underline block">{selected.telephone}</a>
                <a href={`mailto:${selected.email}`} className="text-orange-400 text-sm hover:underline block">{selected.email}</a>
                <p className="text-gray-400 text-sm">{selected.ville}</p>
              </div>

              {/* Changer statut */}
              <div>
                <p className="text-gray-500 text-xs mb-2">Changer le statut</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUTS.map(st => (
                    <button key={st} onClick={() => updateStatut(selected.id, st)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition capitalize ${selected.statut === st ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center justify-center bg-gray-900 border border-gray-800 rounded-2xl text-gray-600">
              Sélectionnez une soumission
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
