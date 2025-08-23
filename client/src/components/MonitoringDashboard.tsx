'use client'

import React, { useState, useEffect } from 'react'
import { LoadingSpinner, LoadingCard } from '@/components/ui/Loading'

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded'
  timestamp: string
  uptime: number
  version: string
  database: {
    status: 'connected' | 'error'
    latency?: number
    models: Record<string, number | 'error'>
    error?: string
  }
  environment: {
    nodeVersion: string
    platform: string
    environment: string
  }
}

interface SystemMetrics {
  responseTime: number
  requests: number
  errors: number
  uptime: number
}

export default function MonitoringDashboard() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null)
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchHealthStatus = async () => {
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setHealthStatus(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch health status:', error)
    }
  }

  const fetchMetrics = async () => {
    // Mock metrics - in production, this would fetch from actual monitoring service
    setMetrics({
      responseTime: Math.floor(Math.random() * 100) + 50,
      requests: Math.floor(Math.random() * 1000) + 500,
      errors: Math.floor(Math.random() * 10),
      uptime: Date.now() - (Math.floor(Math.random() * 86400000)) // Random uptime
    })
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchHealthStatus(), fetchMetrics()])
      setLoading(false)
    }

    loadData()

    // Refresh every 30 seconds
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
        return 'text-green-600 bg-green-100'
      case 'unhealthy':
      case 'error':
        return 'text-red-600 bg-red-100'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatUptime = (uptime: number) => {
    const days = Math.floor(uptime / (24 * 60 * 60 * 1000))
    const hours = Math.floor((uptime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    const minutes = Math.floor((uptime % (60 * 60 * 1000)) / (60 * 1000))
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  if (loading) {
    return <LoadingCard message="Loading system status..." />
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-semibold text-secondary">
          System Monitoring
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted">
          <LoadingSpinner size="sm" />
          <span>
            Last updated: {lastUpdated?.toLocaleTimeString() || 'Never'}
          </span>
        </div>
      </div>

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted">System Status</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              getStatusColor(healthStatus?.status || 'unknown')
            }`}>
              {healthStatus?.status || 'Unknown'}
            </span>
          </div>
          <p className="text-2xl font-semibold text-secondary mt-2 flex items-center gap-2">
            <span className={healthStatus?.status === 'healthy' ? 'text-green-600' : 'text-red-600'}>
              {healthStatus?.status === 'healthy' ? 'Online' : 'Offline'}
            </span>
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-sm font-medium text-muted">Database</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              getStatusColor(healthStatus?.database.status || 'unknown')
            }`}>
              {healthStatus?.database.status || 'Unknown'}
            </span>
            {healthStatus?.database.latency && (
              <span className="text-sm text-muted">
                {healthStatus.database.latency}ms
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-sm font-medium text-muted">Uptime</h3>
          <p className="text-2xl font-semibold text-secondary mt-2">
            {healthStatus?.uptime ? formatUptime(healthStatus.uptime) : 'N/A'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-sm font-medium text-muted">Version</h3>
          <p className="text-lg font-medium text-secondary mt-2">
            {healthStatus?.version || 'Unknown'}
          </p>
        </div>
      </div>

      {/* Database Models */}
      {healthStatus?.database.models && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-secondary mb-4">Database Models</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {Object.entries(healthStatus.database.models).map(([model, count]) => (
              <div key={model} className="text-center">
                <p className="text-sm text-muted capitalize">{model}</p>
                <p className={`text-xl font-semibold ${
                  count === 'error' ? 'text-red-600' : 'text-secondary'
                }`}>
                  {count === 'error' ? 'Error' : count}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      {metrics && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-secondary mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted">Response Time</p>
              <p className="text-2xl font-semibold text-secondary">{metrics.responseTime}ms</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted">Requests (24h)</p>
              <p className="text-2xl font-semibold text-secondary">{metrics.requests.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted">Errors (24h)</p>
              <p className={`text-2xl font-semibold ${
                metrics.errors > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {metrics.errors}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted">Uptime</p>
              <p className="text-2xl font-semibold text-secondary">
                {formatUptime(metrics.uptime)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Environment Info */}
      {healthStatus?.environment && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-secondary mb-4">Environment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted">Node Version</p>
              <p className="font-medium text-secondary">{healthStatus.environment.nodeVersion}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Platform</p>
              <p className="font-medium text-secondary">{healthStatus.environment.platform}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Environment</p>
              <p className="font-medium text-secondary">{healthStatus.environment.environment}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Details */}
      {healthStatus?.database.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-medium text-red-800 mb-2">Database Error</h3>
          <p className="text-red-700 font-mono text-sm">{healthStatus.database.error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          Refresh Page
        </button>
        <button
          onClick={fetchHealthStatus}
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          Check Status
        </button>
      </div>
    </div>
  )
}
