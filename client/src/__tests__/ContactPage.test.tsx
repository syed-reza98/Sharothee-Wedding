import { render } from '@testing-library/react'
import ContactPage from '../app/contact/page'

describe('Contact Page', () => {
  it('renders the contact page without errors', () => {
    const { container } = render(<ContactPage />)
    expect(container).toBeInTheDocument()
  })

  it('displays contact form fields', () => {
    const { container } = render(<ContactPage />)
    
    const nameInput = container.querySelector('input[id="name"]')
    const emailInput = container.querySelector('input[id="email"]')
    const messageTextarea = container.querySelector('textarea[id="message"]')
    
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(messageTextarea).toBeInTheDocument()
  })

  it('has a submit button', () => {
    const { container } = render(<ContactPage />)
    
    const submitButton = container.querySelector('button[type="submit"]')
    expect(submitButton).toBeInTheDocument()
  })
})