// Import utilities from Testing Library and the component to test
import { render, screen, fireEvent } from '@testing-library/react';
import FeedFilter from './FeedFilter';

// Start the test suite for FeedFilter component
describe('FeedFilter Component', () => {
  // Create mock functions to simulate state setters passed as props
  const mockSetSearch = jest.fn();
  const mockSetCategory = jest.fn();

  // Before each test, render the component with the mock props
  beforeEach(() => {
    render(
      <FeedFilter
        search="" // initial search value
        setSearch={mockSetSearch} // mock search setter
        category="All" // default selected category
        setCategory={mockSetCategory} // mock category setter
      />
    );
  });

  // Test 1: Check if UI elements render properly
  test('renders search input and category buttons', () => {
    // Check if the search input exists
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();

    // Check if all category buttons exist
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
  });

  // Test 2: Simulate typing in the search input and assert that setSearch is called correctly
  test('calls setSearch when typing in search input', () => {
    // Get the search input element
    const input = screen.getByPlaceholderText('Search...');

    // Simulate user typing "nextjs" in the input
    fireEvent.change(input, { target: { value: 'nextjs' } });

    // Verify that setSearch was called with "nextjs"
    expect(mockSetSearch).toHaveBeenCalledWith('nextjs');
  });

  // Test 3: Simulate clicking a category button and check if setCategory is called correctly
  test('calls setCategory when clicking category button', () => {
    // Get the "Design" button
    const button = screen.getByText('Design');

    // Simulate clicking the button
    fireEvent.click(button);

    // Expect setCategory to be called with the lowercase value "design"
    expect(mockSetCategory).toHaveBeenCalledWith('design');
  });
});
