"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MediaItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  category: string;
  order: number;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'journey',
    order: 0,
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMediaItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    
    formData.append('title', uploadForm.title);
    formData.append('description', uploadForm.description);
    formData.append('category', uploadForm.category);
    formData.append('order', uploadForm.order.toString());

    try {
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchMedia();
        setUploadForm({ title: '', description: '', category: 'journey', order: 0 });
        setSelectedFiles(null);
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMedia();
      } else {
        alert('Failed to delete media item');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete media item');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
        <p className="text-gray-600 mt-2">Upload and manage photos and videos for the gallery.</p>
      </div>

      {/* Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Upload New Media</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={uploadForm.category}
                onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="journey">Our Journey</option>
                <option value="proposal">The Proposal</option>
                <option value="celebrations">Celebrations</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="venues">Venues</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={uploadForm.description}
              onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={uploadForm.order}
              onChange={(e) => setUploadForm({ ...uploadForm, order: parseInt(e.target.value) || 0 })}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Files
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileSelect}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Select one or more images or videos to upload.
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading || !selectedFiles}
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload Media'}
          </button>
        </form>
      </div>

      {/* Media Grid */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Uploaded Media ({mediaItems.length})</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading media...</p>
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No media items yet. Upload some photos or videos!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-square relative">
                  {item.type === 'IMAGE' ? (
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎥</div>
                        <p className="text-sm text-gray-600">Video</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                  {item.description && (
                    <p className="text-xs text-gray-600 truncate">{item.description}</p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
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
    </div>
  );
}
