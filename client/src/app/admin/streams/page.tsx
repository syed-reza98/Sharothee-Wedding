"use client"

import { useEffect, useState } from 'react'

interface StreamItem {
  id: string
  title: string
  description?: string
  streamUrl: string
  isLive: boolean
  event?: { id: string; title: string }
}

export default function AdminStreamsPage() {
  const [streams, setStreams] = useState<StreamItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchStreams = async () => {
    try {
      const res = await fetch('/api/streams')
      if (!res.ok) throw new Error('Failed to fetch streams')
      const data: StreamItem[] = await res.json()
      setStreams(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const toggleLive = async (id: string, isLive: boolean) => {
    try {
      const res = await fetch('/api/streams', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isLive: !isLive })
      })
      if (!res.ok) throw new Error('Failed to update stream')
      fetchStreams()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  useEffect(() => { fetchStreams() }, [])

  if (loading) return <div className="p-6">Loading streams…</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Live Streams</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg opacity-60 cursor-not-allowed" title="Create via API soon">
          Create Stream
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Live</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {streams.map(s => (
              <tr key={s.id}>
                <td className="px-6 py-4">{s.title}</td>
                <td className="px-6 py-4">{s.event?.title || '-'}</td>
                <td className="px-6 py-4 truncate max-w-[280px]">
                  <a href={s.streamUrl} className="text-primary" target="_blank" rel="noreferrer">{s.streamUrl}</a>
                </td>
                <td className="px-6 py-4">{s.isLive ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => toggleLive(s.id, s.isLive)} className={`px-3 py-1 rounded ${s.isLive ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {s.isLive ? 'Stop' : 'Go Live'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
