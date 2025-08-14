'use client'

import { useState, useEffect } from 'react'

interface Guest {
  id: string
  name: string
  email: string
  token: string
  country?: string
  phone?: string
  createdAt: string
  rsvps?: Array<{
    id: string
    event: {
      id: string
      title: string
    }
  }>
}

interface GuestsResponse {
  guests: Guest[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function AdminGuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    try {
      const response = await fetch('/api/guests')
      
      if (response.ok) {
        const data: GuestsResponse = await response.json()
        // API returns { guests: [...], pagination: {...} }
        setGuests(data.guests || [])
        setPagination(data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0
        })
      } else {
        setError(`Failed to fetch guests: ${response.status}`)
      }
    } catch (err) {
      setError('Error loading guests')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-light text-secondary mb-2">
            Guest Management
          </h1>
          <p className="text-muted">Loading guests...</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-light text-secondary mb-2">
            Guest Management
          </h1>
          {pagination.total > 0 && (
            <p className="text-muted">
              {pagination.total} total guest{pagination.total !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Add Guest
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-secondary">
            Wedding Guests
          </h3>
          <p className="text-sm text-muted mt-1">
            Manage your wedding guest list and RSVP tokens.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RSVP Token
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {guest.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Joined {new Date(guest.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{guest.email}</div>
                    {guest.phone && (
                      <div className="text-sm text-gray-500">{guest.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {guest.token}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {guest.country || 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark mr-3 transition-colors">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {guests.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <span className="text-4xl block mb-4">👥</span>
              <p className="text-lg mb-2">No guests found</p>
              <p>Add your first guest to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
