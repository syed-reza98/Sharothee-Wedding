import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import AdminLayout from '../app/admin/layout'
import AdminLogin from '../app/admin/login/page'
import * as AuthModule from 'next-auth/react'
import * as NavModule from 'next/navigation'

jest.mock('next-auth/react', () => ({
  __esModule: true,
  useSession: jest.fn(),
  signIn: jest.fn(),
  getSession: jest.fn(() => Promise.resolve(null)),
}))

jest.mock('next/navigation', () => {
  // Use minimal mock suitable for tests
  return {
    __esModule: true,
    useRouter: jest.fn(),
    usePathname: () => '/admin/dashboard',
    useSearchParams: () => new URLSearchParams('callbackUrl=/admin/dashboard'),
  }
})

describe('Admin auth flow', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects to /admin/login when unauthenticated in AdminLayout', async () => {
  const push = jest.fn()
  ;(NavModule.useRouter as unknown as jest.Mock).mockReturnValue({ push, replace: jest.fn() })
  ;(AuthModule.useSession as unknown as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' })

    render(
      <AdminLayout>
        <div>Protected Content</div>
      </AdminLayout>
    )

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/admin/login?callbackUrl=/admin/dashboard')
    })
  })

  it('renders children when authenticated in AdminLayout', () => {
  ;(AuthModule.useSession as unknown as jest.Mock).mockReturnValue({ data: { user: { email: 'admin@test.com' } }, status: 'authenticated' })

    render(
      <AdminLayout>
        <div>Protected Content</div>
      </AdminLayout>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('logs in via credentials and redirects on AdminLogin', async () => {
  ;(AuthModule.getSession as unknown as jest.Mock).mockResolvedValue(null)
  ;(AuthModule.signIn as unknown as jest.Mock).mockResolvedValue({ error: null })

  const push = jest.fn()
  ;(NavModule.useRouter as unknown as jest.Mock).mockReturnValue({ push, replace: jest.fn() })

    render(<AdminLogin />)

    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'admin@wedding.com' } })
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
  expect(AuthModule.signIn).toHaveBeenCalledWith('credentials', expect.objectContaining({
        email: 'admin@wedding.com',
        password: 'admin123',
        redirect: false,
      }))
      expect(push).toHaveBeenCalledWith('/admin/dashboard')
    })
  })
})
