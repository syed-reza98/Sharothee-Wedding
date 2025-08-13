import { render } from '@testing-library/react'
import EventsPage from '../app/events/page'

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('Events Page', () => {
  it('renders the events page without errors', () => {
    const { container } = render(<EventsPage />)
    expect(container).toBeInTheDocument()
  })

  it('displays event timeline structure', () => {
    const { container } = render(<EventsPage />)
    
    // Check for timeline elements
    const timelineElements = container.querySelectorAll('.space-y-12')
    expect(timelineElements.length).toBeGreaterThan(0)
  })

  it('shows event cards with emojis', () => {
    const { container } = render(<EventsPage />)
    
    // Check for event emoji indicators
    const emojiElements = container.querySelectorAll('.text-3xl')
    expect(emojiElements.length).toBeGreaterThan(0)
  })
})