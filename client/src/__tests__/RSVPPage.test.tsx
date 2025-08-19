import { render, screen } from '@testing-library/react'
import RSVPPage from '../app/rsvp/page'

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('RSVP Page', () => {
  beforeAll(() => {
    // Force the page to render the form (step 2)
    process.env.NEXT_PUBLIC_SKIP_RSVP_CODE = 'true'
  })

  it('renders the RSVP page heading', () => {
    render(<RSVPPage />)
    
    expect(screen.getByRole('heading', { name: /^RSVP$/i, level: 1 })).toBeInTheDocument()
  })

  it('shows the RSVP selection form', () => {
    render(<RSVPPage />)
    // At least one event card and radio options should be visible
    expect(screen.getByText(/Holud/i)).toBeInTheDocument()
    expect(screen.getByText(/Akdh/i)).toBeInTheDocument()
    expect(screen.getByText(/Reception/i)).toBeInTheDocument()
  // Check for radio labels (appears for each event)
  expect(screen.getAllByText(/Will you be attending\?/i).length).toBeGreaterThan(0)
  })

  it('has a continue button', () => {
    render(<RSVPPage />)
    
    expect(screen.getByRole('button', { name: /submit rsvp/i })).toBeInTheDocument()
  })
})