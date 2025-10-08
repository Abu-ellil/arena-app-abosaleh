import { render, screen, fireEvent } from "@testing-library/react";
import EventCard from "../EventCard";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

const mockEvent = {
  id: "test-event-1",
  title: "Test Concert Event",
  description: "Amazing test concert experience",
  date: "2024-12-25T20:00:00Z",
  venue: "Test Arena Kuwait",
  category: "حفل موسيقي",
  image: "/test-image.jpg",
  time: "8:00 PM",
};

describe("EventCard Component", () => {
  it("renders event information correctly", () => {
    render(<EventCard event={mockEvent} />);

    expect(screen.getByText("Test Concert Event")).toBeInTheDocument();
    expect(screen.getByText("Test Arena Kuwait")).toBeInTheDocument();
    expect(screen.getByText("حفل موسيقي")).toBeInTheDocument();
  });

  it("renders with default variant", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    const card = container.querySelector(".arena-event-card--default");
    expect(card).toBeInTheDocument();
  });

  it("renders with compact variant", () => {
    const { container } = render(
      <EventCard event={mockEvent} variant="compact" />
    );
    const card = container.querySelector(".arena-event-card--compact");
    expect(card).toBeInTheDocument();
  });

  it("renders with featured variant", () => {
    const { container } = render(
      <EventCard event={mockEvent} variant="featured" />
    );
    const card = container.querySelector(".arena-event-card--featured");
    expect(card).toBeInTheDocument();
  });

  it("shows action buttons by default", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("عرض التفاصيل")).toBeInTheDocument();
  });

  it("hides action buttons when showActions is false", () => {
    render(<EventCard event={mockEvent} showActions={false} />);
    expect(screen.queryByText("عرض التفاصيل")).not.toBeInTheDocument();
  });

  it("handles missing image gracefully", () => {
    const eventWithoutImage = { ...mockEvent, image: undefined };
    const { container } = render(<EventCard event={eventWithoutImage} />);
    const fallbackBg = container.querySelector(".arena-event-card-fallback-bg");
    expect(fallbackBg).toBeInTheDocument();
  });

  it("formats date correctly", () => {
    render(<EventCard event={mockEvent} />);
    // The component should format the date and show day/month
    const dateElements = screen.getAllByText(/25|DEC/i);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <EventCard event={mockEvent} className="custom-class" />
    );
    const linkElement = container.querySelector(".custom-class");
    expect(linkElement).toBeInTheDocument();
  });

  it("creates correct link to event page", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    const link = container.querySelector('a[href="/event/test-event-1"]');
    expect(link).toBeInTheDocument();
  });

  it("handles image load and error states", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    const image = container.querySelector(".arena-event-card-image");

    // Simulate image load
    if (image) {
      fireEvent.load(image);
      expect(image).toHaveClass("opacity-100");
    }
  });

  it("shows time when provided", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("8:00 PM")).toBeInTheDocument();
  });

  it("handles event without time", () => {
    const eventWithoutTime = { ...mockEvent, time: undefined };
    render(<EventCard event={eventWithoutTime} />);
    expect(screen.queryByText("8:00 PM")).not.toBeInTheDocument();
  });
});

describe("EventCard Accessibility", () => {
  it("has proper link structure for screen readers", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/event/test-event-1");
  });

  it("has proper image alt text", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    const image = container.querySelector("img");
    expect(image).toHaveAttribute("alt", "Test Concert Event");
  });

  it("maintains semantic HTML structure", () => {
    render(<EventCard event={mockEvent} />);
    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toHaveTextContent("Test Concert Event");
  });
});

describe("EventCard Responsive Behavior", () => {
  it("applies responsive classes correctly", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    const card = container.querySelector(".arena-event-card");
    expect(card).toBeInTheDocument();

    // Check for responsive image container
    const imageContainer = container.querySelector(
      ".arena-event-card-image-container"
    );
    expect(imageContainer).toBeInTheDocument();
  });
});
