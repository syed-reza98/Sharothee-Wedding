'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Media {
  id: string
  fileName: string
  fileUrl: string
  fileType: string
  uploadedAt: string
  approved: boolean
  guestId?: string
  guest?: {
    name: string
  }
}

export default function AdminMedia() {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all')

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media')
      if (response.ok) {
        const data = await response.json()
        setMedia(data)
      } else {
        throw new Error('Failed to fetch media')
      }
    } catch (error) {
      console.error('Error fetching media:', error)
      alert('Failed to load media')
    } finally {
      setLoading(false)
    }
  }

  const updateMediaStatus = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved }),
      })

      if (response.ok) {
        setMedia(media.map(item => 
          item.id === id ? { ...item, approved } : item
        ))
        alert(approved ? 'Media approved' : 'Media rejected')
      } else {
        throw new Error('Failed to update media status')
      }
    } catch (error) {
      console.error('Error updating media:', error)
      alert('Failed to update media status')
    }
  }

  const deleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) {
      return
    }

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMedia(media.filter(item => item.id !== id))
        alert('Media deleted')
      } else {
        throw new Error('Failed to delete media')
      }
    } catch (error) {
      console.error('Error deleting media:', error)
      alert('Failed to delete media')
    }
  }

  const filteredMedia = media.filter(item => {
    if (filter === 'approved') return item.approved
    if (filter === 'pending') return !item.approved
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-secondary">Media Management</h1>
          <p className="text-muted mt-1">Manage uploaded photos and videos from guests</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({media.length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved ({media.filter(m => m.approved).length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({media.filter(m => !m.approved).length})
          </button>
        </div>
      </div>

      {filteredMedia.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted">No media found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                {item.fileType.startsWith('image/') ? (
                  <Image
                    src={item.fileUrl}
                    alt={item.fileName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎥</div>
                      <p className="text-sm text-gray-600">Video File</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {item.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-3">
                  <p className="font-medium text-gray-900 truncate" title={item.fileName}>
                    {item.fileName}
                  </p>
                  {item.guest && (
                    <p className="text-sm text-gray-600">
                      Uploaded by: {item.guest.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  {!item.approved ? (
                    <button
                      onClick={() => updateMediaStatus(item.id, true)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => updateMediaStatus(item.id, false)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      Unapprove
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteMedia(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
