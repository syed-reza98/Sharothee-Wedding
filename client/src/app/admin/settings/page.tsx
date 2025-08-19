"use client"

import { useState } from 'react'

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false)

  // Placeholder settings for now
  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => setSaving(false), 600)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <form onSubmit={save} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Incia & Arvin's Wedding" defaultValue="Incia & Arvin's Wedding" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="hello@inciaandarvins.wedding" defaultValue="hello@inciaandarvins.wedding" />
        </div>
        <button type="submit" disabled={saving} className="bg-primary text-white px-4 py-2 rounded-lg">
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
