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

  it('displays event timeline items', () => {
    const { getAllByTestId } = render(<EventsPage />)
    const items = getAllByTestId('event-timeline-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('shows event cards with icons', () => {
    const { getAllByTestId } = render(<EventsPage />)
    const iconElements = getAllByTestId('event-icon')
    expect(iconElements.length).toBeGreaterThan(0)
  })
})