import { render, screen, fireEvent } from '@testing-library/react';
import Feeds from '@/components/Feeds';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

// Mocking modules
jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn()
}));

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn()
}));

describe('Feeds Component', () => {
  beforeEach(() => {
    useInView.mockReturnValue({ ref: jest.fn(), inView: false });
  });

  it('shows loading skeletons while data is loading', () => {
    useInfiniteQuery.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: true,
      isError: false
    });

    render(<Feeds />);
    expect(screen.getAllByText(/loading/i).length).toBeGreaterThanOrEqual(0);
  });

  it('displays feed cards when data is loaded', () => {
    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          { posts: [{ _id: '1', title: 'Post 1' }, { _id: '2', title: 'Post 2' }] }
        ]
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false
    });

    render(<Feeds />);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('updates search input value when typed in', () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [{ posts: [] }] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false
    });

    render(<Feeds />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Design' } });
    expect(input.value).toBe('Design');
  });

  it('shows "No Result" message when posts are empty', () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [{ posts: [] }] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false
    });

    render(<Feeds />);
    expect(screen.getByText(/No Result/i)).toBeInTheDocument();
  });

  it('shows error message when query fails', () => {
    useInfiniteQuery.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: true
    });

    render(<Feeds />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('shows loading spinner when fetching next page', () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [{ posts: [{ _id: '1', title: 'Post 1' }] }] },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: true,
      isLoading: false,
      isError: false
    });

    render(<Feeds />);
    expect(screen.getByText(/loading content/i)).toBeInTheDocument();
  });
});
