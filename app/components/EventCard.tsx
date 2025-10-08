"use client";

import Link from "next/link";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string[];
  venue: string;
  category: string;
  image?: string;
  time?: string;
}

interface EventCardProps {
  event: Event;
  className?: string;
  variant?: "default" | "compact" | "featured";
  showActions?: boolean;
}

export default function EventCard({
  event,
  className = "",
  variant = "default",
  showActions = true,
}: EventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Format date for display
  const formatEventDate = (dateStrings: string[]) => {
    return dateStrings.map((dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date
        .toLocaleDateString("ar-SA", { month: "short" })
        .toUpperCase();
      return { day, month };
    });
  };

  const formattedDates = formatEventDate(event.date);

  const cardClasses = `arena-event-card arena-event-card--${variant} group cursor-pointer`;

  return (
    <Link href={`/event/${event.id}`} className={`block ${className}`}>
      <div className={cardClasses}>
        {/* Event Image Container */}
        <div className="arena-event-card-image-container">
          {/* Background Image */}
          {event.image && !imageError ? (
            <img
              src={event.image}
              alt={event.title}
              className={`arena-event-card-image ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="arena-event-card-fallback-bg" />
          )}

          {/* Gradient Overlay */}
          <div className="arena-event-card-overlay" />

          {/* Category Badge */}
          <div className="arena-event-card-category-badge">
            <span className="arena-event-card-category-text">
              {event.category}
            </span>
          </div>

          {/* Date Badge */}
          <div className="arena-event-card-date-badge">
            {formattedDates.map((dateObj, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="arena-event-card-date-day">{dateObj.day}</div>
                <div className="arena-event-card-date-month">{dateObj.month}</div>
              </div>
            ))}
          </div>

          {/* Hover Overlay */}
          <div className="arena-event-card-hover-overlay" />
        </div>

        {/* Event Details */}
        <div className="arena-event-card-content">
          <h3 className="arena-event-card-title">{event.title}</h3>
          <p className="arena-event-card-venue">{event.venue}</p>
          <div className="arena-event-card-meta">
            <span className="arena-event-card-date-text">
              {formattedDates
                .map((dateObj) => `${dateObj.day} ${dateObj.month}`)
                .join(" - ")}
            </span>
            {event.time && (
              <span className="arena-event-card-time">{event.time}</span>
            )}
          </div>
        </div>

        {/* Interactive Elements */}
        {showActions && (
          <div className="arena-event-card-actions">
            <div className="arena-event-card-action-button">
              <span>عرض التفاصيل</span>
              <svg
                className="arena-event-card-arrow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
