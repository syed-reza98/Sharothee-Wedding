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
  it('renders the RSVP page heading', () => {
    render(<RSVPPage />)
    
    expect(screen.getByRole('heading', { name: /^RSVP$/i, level: 1 })).toBeInTheDocument()
  })

  it('displays the token input form', () => {
    render(<RSVPPage />)
    
    const tokenInput = screen.getByRole('textbox')
    expect(tokenInput).toBeInTheDocument()
    expect(tokenInput).toHaveAttribute('placeholder', 'Enter your RSVP code')
  })

  it('has a continue button', () => {
    render(<RSVPPage />)
    
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
  })
})