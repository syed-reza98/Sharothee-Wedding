"use client"

import { useEffect, useState } from 'react'

interface ContactRequest {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: string
  createdAt: string
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contact')
      if (!res.ok) throw new Error('Failed to fetch contacts')
      const data: ContactRequest[] = await res.json()
      setContacts(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchContacts() }, [])

  if (loading) return <div className="p-6">Loading contacts…</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Contact Requests</h1>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map(c => (
              <tr key={c.id}>
                <td className="px-6 py-4">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-muted">{c.email}</div>
                </td>
                <td className="px-6 py-4">{c.subject}</td>
                <td className="px-6 py-4 max-w-[440px] truncate" title={c.message}>{c.message}</td>
                <td className="px-6 py-4">{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
