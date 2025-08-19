'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  UsersIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ClockIcon,
  PhotoIcon,
  CalendarDaysIcon,
  FilmIcon,
} from '@heroicons/react/24/outline'

interface DashboardStats {
  totalGuests: number
  totalRSVPs: number
  attendingCount: number
  pendingCount: number
  mediaCount: number
  contactRequests: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalGuests: 0,
    totalRSVPs: 0,
    attendingCount: 0,
    pendingCount: 0,
    mediaCount: 0,
    contactRequests: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        // This would typically fetch from multiple API endpoints
        // For now, using placeholder data
        setStats({
          totalGuests: 150,
          totalRSVPs: 120,
          attendingCount: 95,
          pendingCount: 25,
          mediaCount: 45,
          contactRequests: 8
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const quickStats = [
    {
      title: 'Total Guests',
      value: stats.totalGuests,
      icon: UsersIcon,
      href: '/admin/guests',
      color: 'bg-blue-500'
    },
    {
      title: 'RSVPs Received',
      value: stats.totalRSVPs,
      icon: EnvelopeIcon,
      href: '/admin/guests',
      color: 'bg-green-500'
    },
    {
      title: 'Attending',
      value: stats.attendingCount,
      icon: CheckCircleIcon,
      href: '/admin/guests',
      color: 'bg-emerald-500'
    },
    {
      title: 'Pending RSVPs',
      value: stats.pendingCount,
      icon: ClockIcon,
      href: '/admin/guests',
      color: 'bg-yellow-500'
    },
    {
      title: 'Media Items',
      value: stats.mediaCount,
      icon: PhotoIcon,
      href: '/admin/media',
      color: 'bg-purple-500'
    },
    {
      title: 'Contact Requests',
      value: stats.contactRequests,
      icon: EnvelopeIcon,
      href: '/admin/contacts',
      color: 'bg-red-500'
    }
  ]

  const quickActions = [
    {
      title: 'Add New Guest',
      description: 'Invite a new guest to the wedding',
      href: '/admin/guests',
      icon: UsersIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Upload Media',
      description: 'Add photos or videos to the gallery',
      href: '/admin/media',
      icon: PhotoIcon,
      color: 'bg-purple-500'
    },
    {
      title: 'Create Event',
      description: 'Add a new wedding event',
      href: '/admin/events',
      icon: CalendarDaysIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Manage Streams',
      description: 'Set up live streaming for events',
      href: '/admin/streams',
      icon: FilmIcon,
      color: 'bg-red-500'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-light text-secondary mb-2">
          Dashboard
        </h1>
        <p className="text-muted">
          Welcome back! Here&apos;s what&apos;s happening with Incia & Arvin&apos;s wedding.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted">{stat.title}</p>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* RSVP Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-secondary mb-4">RSVP Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.attendingCount}</div>
            <div className="text-sm text-muted">Attending</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{stats.pendingCount}</div>
            <div className="text-sm text-muted">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {stats.totalGuests - stats.totalRSVPs}
            </div>
            <div className="text-sm text-muted">No Response</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-secondary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${action.color} rounded-lg p-3 mb-3`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                <p className="text-sm text-muted">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-secondary mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center py-2">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">New RSVP received</p>
              <p className="text-sm text-muted">John & Jane Doe confirmed attendance</p>
            </div>
            <div className="ml-auto text-sm text-muted">2 hours ago</div>
          </div>
          <div className="flex items-center py-2">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <PhotoIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">New media uploaded</p>
              <p className="text-sm text-muted">3 photos added to engagement album</p>
            </div>
            <div className="ml-auto text-sm text-muted">5 hours ago</div>
          </div>
          <div className="flex items-center py-2">
            <div className="bg-purple-100 rounded-full p-2 mr-3">
              <EnvelopeIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Contact form submission</p>
              <p className="text-sm text-muted">Question about dietary preferences</p>
            </div>
            <div className="ml-auto text-sm text-muted">1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  )
}
