import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'

describe('Home Page', () => {
  it('renders the home page heading', () => {
    render(<HomePage />)
    
    expect(screen.getByRole('heading', { name: /Incia & Arvin/i, level: 2 })).toBeInTheDocument()
  })

  it('displays save the date section', () => {
    render(<HomePage />)
    
    expect(screen.getByRole('heading', { name: /Save the Date/i })).toBeInTheDocument()
  })

  it('contains RSVP button', () => {
    render(<HomePage />)
    
    expect(screen.getByRole('link', { name: /rsvp now/i })).toBeInTheDocument()
  })
})