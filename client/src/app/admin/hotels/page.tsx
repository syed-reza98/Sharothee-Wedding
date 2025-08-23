"use client"

import { useEffect, useState } from 'react'

interface Hotel {
  id: string
  name: string
  address: string
  city: string
  country: string
  phone?: string
  email?: string
  website?: string
  description?: string
}

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchHotels = async () => {
    try {
      const res = await fetch('/api/hotels')
      if (!res.ok) throw new Error('Failed to fetch hotels')
      const data: Hotel[] = await res.json()
      setHotels(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchHotels() }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hotels</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg opacity-60 cursor-not-allowed" title="Add via API soon">
          Add Hotel
        </button>
      </div>

      {loading && <div>Loading hotels…</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map(h => (
          <div key={h.id} className="bg-white rounded-lg p-4 shadow border">
            <h3 className="font-semibold text-lg">{h.name}</h3>
            <p className="text-sm text-muted">{h.address}, {h.city}, {h.country}</p>
            {h.phone && <p className="text-sm text-muted">{h.phone}</p>}
            {h.email && <p className="text-sm text-muted">{h.email}</p>}
            {h.website && <a href={h.website} className="text-primary text-sm" target="_blank">Website</a>}
          </div>
        ))}
      </div>
    </div>
  )
}
