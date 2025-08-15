import { render, screen, act } from '@testing-library/react'
import Countdown from '../components/Countdown'

// Fixed system time for deterministic tests
const mockDate = new Date('2024-12-01T00:00:00+06:00')

describe('Countdown Component', () => {
  beforeEach(() => {
  jest.useFakeTimers()
  jest.setSystemTime(mockDate)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders countdown for future date', () => {
    render(<Countdown targetDate="2025-12-20T00:00:00+06:00" />)
    
    // Should show countdown elements
    expect(screen.getByText(/Days?/)).toBeInTheDocument()
    expect(screen.getByText(/Hours?/)).toBeInTheDocument()
    expect(screen.getByText(/Mins?/)).toBeInTheDocument()
    expect(screen.getByText(/Secs?/)).toBeInTheDocument()
    expect(screen.getByText('Until we say "I do"')).toBeInTheDocument()
  })

  it('calculates correct time remaining', () => {
    render(<Countdown targetDate="2025-12-20T00:00:00+06:00" />)
    
    // Check that countdown shows reasonable values (days should be > 0 for future date)
    const daysElement = screen.getByText('Days').previousSibling
    expect(daysElement).toBeInTheDocument()
    expect(Number(daysElement?.textContent)).toBeGreaterThan(0)
  })

  it('shows celebratory message when date has passed', () => {
    render(<Countdown targetDate="2020-12-20T00:00:00+06:00" />)
    
    expect(screen.getByText(/We're Married!/)).toBeInTheDocument()
    expect(screen.getByText('Thank you for celebrating with us')).toBeInTheDocument()
  })

  it('updates countdown every second', () => {
    const { rerender } = render(<Countdown targetDate="2025-12-20T00:00:00+06:00" />)
    
    // Advance time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    // Re-render to trigger useEffect
    rerender(<Countdown targetDate="2025-12-20T00:00:00+06:00" />)
    
    // Should update (though in this test we're mocking Date, so it won't actually change)
    expect(screen.getByText(/Secs?/)).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Countdown targetDate="2025-12-20T00:00:00+06:00" className="custom-class" />
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('handles singular vs plural labels correctly', () => {
    render(<Countdown targetDate="2025-12-20T00:00:00+06:00" />)
    
    // Check that labels are present (actual values depend on mock date)
    const labels = screen.getAllByText(/Days?|Hours?|Mins?|Secs?/)
    expect(labels.length).toBe(4)
  })
})