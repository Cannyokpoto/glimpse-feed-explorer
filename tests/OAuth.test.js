/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavBar from '@/components/NavBar/NavBar';
import { SessionProvider } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { ThemeProvider } from '@/ThemeProvider/ThemeProvider';


// Mock NextAuth signIn function
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getProviders: async () => ({
    google: { id: 'google', name: 'Google' }
  }),
}));


describe('OAuth Integration - Google Sign In', () => {
  it('calls signIn when the Google button is clicked', async () => {
    render(
      <SessionProvider session={null}>
        <ThemeProvider>
          <NavBar />
        </ThemeProvider>
      </SessionProvider>
    );

    const button = await screen.findByRole('button', { name: /sign in with google/i });

    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(signIn).toHaveBeenCalledWith('google');
  });
});
