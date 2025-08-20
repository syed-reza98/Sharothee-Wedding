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
    
    // Check for the main RSVP question
    expect(screen.getByLabelText(/grace us with your presence/i)).toBeInTheDocument()
    
    // Check for family side question
    expect(screen.getByText(/Are you from The Bride's Family or The Groom's Family\?/i)).toBeInTheDocument()
    
    // Check for guest count question
    expect(screen.getByText(/How many guests will be present\?/i)).toBeInTheDocument()
    
    // Check for additional information field (use partial text to avoid special character issues)
    expect(screen.getByText(/additional information/i)).toBeInTheDocument()
    
    // Check for contact details section
    expect(screen.getByText(/Contact Details/i)).toBeInTheDocument()
  })

  it('has a continue button', () => {
    render(<RSVPPage />)
    
    expect(screen.getByRole('button', { name: /submit rsvp/i })).toBeInTheDocument()
  })
})