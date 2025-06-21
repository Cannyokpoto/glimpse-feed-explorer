// Import testing tools and the component
import { render, screen } from '@testing-library/react';
import ShareButtons from './ShareButtons';

// Mock react-share and all its exports
jest.mock('react-share', () => ({
  FacebookShareButton: ({ children }) => <div data-testid="facebook">{children}</div>,
  TwitterShareButton: ({ children }) => <div data-testid="twitter">{children}</div>,
  WhatsappShareButton: ({ children }) => <div data-testid="whatsapp">{children}</div>,
  EmailShareButton: ({ children }) => <div data-testid="email">{children}</div>,
  FacebookIcon: () => <div>FacebookIcon</div>,
  TwitterIcon: () => <div>TwitterIcon</div>,
  WhatsappIcon: () => <div>WhatsappIcon</div>,
  EmailIcon: () => <div>EmailIcon</div>,
}));


describe('ShareButtons', () => {
  const mockPost = {
    _id: "abc123",
    title: "A Test Article",
    author: "Jane Doe",
    category: "marketing",
  };

  test('renders share heading and all share buttons', () => {
    render(<ShareButtons post={mockPost} />);

    // Check heading
    expect(screen.getByText(/share this post/i)).toBeInTheDocument();

    // Check icons
    expect(screen.getByText('FacebookIcon')).toBeInTheDocument();
    expect(screen.getByText('TwitterIcon')).toBeInTheDocument();
    expect(screen.getByText('WhatsappIcon')).toBeInTheDocument();
    expect(screen.getByText('EmailIcon')).toBeInTheDocument();

    // Check if the wrappers (buttons) are present
    expect(screen.getByTestId('facebook')).toBeInTheDocument();
    expect(screen.getByTestId('twitter')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
  });
});
