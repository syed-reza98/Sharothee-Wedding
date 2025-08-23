"use client"

import { useEffect, useState } from "react"

interface Venue { id: string; name: string }
interface EventItem {
  id: string
  title: string
  description: string
  date: string
  time: string
  venue: Venue
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events")
      if (!res.ok) throw new Error("Failed to load events")
      const data: EventItem[] = await res.json()
      setEvents(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  if (loading) return <div className="p-6">Loading events…</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg opacity-60 cursor-not-allowed" title="Create handled via CLI or DB UI for now">
          Create Event
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((ev) => (
              <tr key={ev.id}>
                <td className="px-6 py-4">{ev.title}</td>
                <td className="px-6 py-4">{new Date(ev.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{ev.time}</td>
                <td className="px-6 py-4">{ev.venue?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
