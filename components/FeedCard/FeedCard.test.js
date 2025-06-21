// Import the required testing utilities and the component to be tested
import { render, screen } from "@testing-library/react";
import FeedCard from "./FeedCard";
import { useRouter } from "next/navigation";

// Mock the Next.js router to prevent actual navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock next/image so it doesn't break the test (Next.js optimization not needed in tests)
jest.mock("next/image", () => (props) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt || "image"} />;
});

// Mock the image path import
jest.mock("@/utils/images", () => ({
  feed: "mocked-feed-image.jpg",
}));

describe("FeedCard", () => {
  // Provide a sample feed item for the test
  const sampleFeed = {
    _id: "123abc",
    title: "Test Post Title",
    description: "This is a sample post description for testing purposes.",
    author: "John Doe",
    date: "2025-06-19T00:00:00.000Z",
    category: "development",
  };

  test("renders the feed card with title, description, author, and date", () => {
    // Render the FeedCard component with sample data
    render(<FeedCard feed={sampleFeed} />);

    // Assertions to check for expected content
    expect(screen.getByText("Test Post Title")).toBeInTheDocument(); // title
    expect(screen.getByText(/This is a sample post description/i)).toBeInTheDocument(); // description snippet
    expect(screen.getByText(/John Doe/)).toBeInTheDocument(); // author name
    expect(screen.getByText("19th June 2025")).toBeInTheDocument(); // formatted date
    expect(screen.getByRole("img")).toHaveAttribute("src", "mocked-feed-image.jpg"); // image
  });

  test("should link to the correct feed detail page", () => {
    render(<FeedCard feed={sampleFeed} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/feed/123abc`);
  });
});
