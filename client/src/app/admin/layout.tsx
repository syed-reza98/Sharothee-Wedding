'use client';

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import {
  ChartBarIcon,
  UsersIcon,
  CalendarDaysIcon,
  PhotoIcon,
  BuildingOfficeIcon,
  PlayCircleIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

const adminNavigation: { name: string; href: string; icon: React.ElementType }[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
  { name: 'Guests', href: '/admin/guests', icon: UsersIcon },
  { name: 'Events', href: '/admin/events', icon: CalendarDaysIcon },
  { name: 'Media', href: '/admin/media', icon: PhotoIcon },
  { name: 'Hotels', href: '/admin/hotels', icon: BuildingOfficeIcon },
  { name: 'Streams', href: '/admin/streams', icon: PlayCircleIcon },
  { name: 'Contacts', href: '/admin/contacts', icon: EnvelopeIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const isLoginRoute = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginRoute) return
    if (status === 'loading') return // Still loading
    if (!session) {
      router.push('/admin/login?callbackUrl=/admin/dashboard')
      return
    }
  }, [session, status, router, isLoginRoute])

  if (!isLoginRoute && status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isLoginRoute && !session) {
    return null
  }

  const isActive = (href: string) => pathname === href

  // Render login route without admin chrome
  if (isLoginRoute) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center">
                <h1 data-testid="admin-header" className="text-xl font-serif font-semibold text-secondary">
                  Wedding Admin
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-muted hover:text-primary transition-colors"
                target="_blank"
              >
                View Site
              </Link>
              <span className="text-muted">|</span>
              <span className="text-sm text-muted">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
  <nav aria-label="Admin Navigation" className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {adminNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-white'
                        : 'text-muted hover:bg-gray-100 hover:text-primary'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-white' : 'text-muted'}`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
  <main role="main" className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
