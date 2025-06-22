
import { render, screen } from "@testing-library/react";
import FeedCard from "./FeedCard";
import { useRouter } from "next/navigation";

// Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock next/image so it doesn't break the test
jest.mock("next/image", () => (props) => {
  return <img {...props} alt={props.alt || "image"} />;
});

// Mock the image path import
jest.mock("@/utils/images", () => ({
  feed: "mocked-feed-image.jpg",
}));

describe("FeedCard", () => {
  const sampleFeed = {
    _id: "123abc",
    title: "Test Post Title",
    description: "This is a sample post description for testing purposes.",
    author: "Promise Okpoto",
    date: "2025-06-19T00:00:00.000Z",
    category: "development",
  };

  test("renders the feed card with title, description, author, and date", () => {

    // Render the FeedCard component with sample data
    render(<FeedCard feed={sampleFeed} />);

    // Assertions to check for expected content
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText(/This is a sample post description/i)).toBeInTheDocument();
    expect(screen.getByText(/Promise Okpoto/)).toBeInTheDocument();
    expect(screen.getByText("19th June 2025")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "mocked-feed-image.jpg");
  });

  test("should link to the correct feed detail page", () => {
    render(<FeedCard feed={sampleFeed} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/feed/123abc`);
  });
});
