import { Metadata } from 'next'
import MonitoringDashboard from '@/components/MonitoringDashboard'

export const metadata: Metadata = {
  title: 'System Monitoring - Wedding Admin',
  description: 'System health and performance monitoring dashboard',
  robots: 'noindex, nofollow',
}

export default function MonitoringPage() {
  return (
    <div className="min-h-screen bg-gradient-wedding">
      <div className="container mx-auto px-4 py-8">
        <MonitoringDashboard />
      </div>
    </div>
  )
}
