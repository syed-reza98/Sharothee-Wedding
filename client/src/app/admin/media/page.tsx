'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface MediaItem {
  id: string
  title?: string
  description?: string
  type: 'IMAGE' | 'VIDEO'
  url: string
  category: string
  album?: string
  caption?: string
  public: boolean
  approved: boolean
  featured: boolean
  createdAt: string
}

export default function AdminMediaPage() {
  const { data: session } = useSession()
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media')
      if (response.ok) {
        const data = await response.json()
        setMediaItems(data)
      } else {
        setError('Failed to fetch media')
      }
    } catch (err) {
      setError('Error loading media')
    } finally {
      setLoading(false)
    }
  }

  const toggleApproval = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: !approved }),
      })

      if (response.ok) {
        fetchMedia() // Refresh the list
      } else {
        setError('Failed to update media item')
      }
    } catch (err) {
      setError('Error updating media item')
    }
  }

  const deleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchMedia() // Refresh the list
      } else {
        setError('Failed to delete media item')
      }
    } catch (err) {
      setError('Error deleting media item')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Media Management</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Media Management</h1>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg">
          Upload Media
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Wedding Media Gallery
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Manage photos and videos for your wedding website.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {item.type === 'IMAGE' ? (
                  <img
                    src={item.url}
                    alt={item.title || 'Wedding photo'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Image'
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <span className="text-4xl">🎥</span>
                    <p className="text-sm text-gray-500 mt-2">Video</p>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 truncate">
                    {item.title || 'Untitled'}
                  </h4>
                  <div className="flex space-x-1">
                    {item.featured && (
                      <span className="text-yellow-500" title="Featured">⭐</span>
                    )}
                    {item.public && (
                      <span className="text-green-500" title="Public">🌐</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.approved ? 'Approved' : 'Pending'}
                  </span>
                  <span className="text-xs text-gray-500">{item.category}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleApproval(item.id, item.approved)}
                    className={`flex-1 px-3 py-1 text-xs rounded ${
                      item.approved
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {item.approved ? 'Unapprove' : 'Approve'}
                  </button>
                  <button
                    onClick={() => deleteMedia(item.id)}
                    className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mediaItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <span className="text-4xl block mb-4">📸</span>
              <p className="text-lg mb-2">No media items found</p>
              <p>Upload your first photo or video to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
