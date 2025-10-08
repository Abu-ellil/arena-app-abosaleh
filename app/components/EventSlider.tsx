"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCurrency } from "./CurrencyProvider";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string[];
  venue: string;
  image?: string;
  category?: string;
  seats?: Array<{
    category: string;
    price: number;
  }>;
}

interface EventSliderProps {
  currentEventId?: string;
  title?: string;
  category?: string;
}

export default function EventSlider({
  currentEventId,
  title = "قد تعجبك أيضاً",
  category,
}: EventSliderProps) {
  const { formatPrice } = useCurrency();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (response.ok) {
          const allEvents = await response.json();

          // Filter out current event and filter by category if provided
          let filteredEvents = allEvents.filter(
            (event: Event) => event.id !== currentEventId
          );

          // Filter by category if specified
          if (category) {
            filteredEvents = filteredEvents.filter(
              (event: Event) => event.category === category
            );
          }

          // Shuffle and take first 5 events
          const shuffled = filteredEvents.sort(() => 0.5 - Math.random());
          setEvents(shuffled.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentEventId, category]);

  // Auto-advance slider every 3 seconds
  useEffect(() => {
    if (events.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 5000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [events.length]);

  const getMinPrice = (event: Event) => {
    if (!event.seats || event.seats.length === 0) return 250;
    return Math.min(...event.seats.map((seat) => seat.price));
  };

  const formatEventDate = (dateStrings: string[]) => {
    if (!dateStrings || dateStrings.length === 0) {
      return [{ day: '', month: 'تاريخ غير متوفر' }];
    }
    
    return dateStrings.map((dateString) => {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return { day: '', month: 'تاريخ غير متوفر' };
      }
      
      const day = date.getDate();
      const monthEnglish = date.toLocaleDateString("en-US", { month: "long" });
      const arabicMonthNames: { [key: string]: string } = {
        'January': 'يناير',
        'February': 'فبراير',
        'March': 'مارس',
        'April': 'أبريل',
        'May': 'مايو',
        'June': 'يونيو',
        'July': 'يوليو',
        'August': 'أغسطس',
        'September': 'سبتمبر',
        'October': 'أكتوبر',
        'November': 'نوفمبر',
        'December': 'ديسمبر',
      };
      const month = arabicMonthNames[monthEnglish];
      return { day, month };
    });
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  if (loading) {
    return null;
  }

  if (events.length === 0) {
    return null;
  }

  const currentEvent = events[currentIndex];

  return (
    <div className="mb-8">
      <Link href={`/event/${currentEvent.id}`} className="block">
        <div className="relative w-full h-96 overflow-hidden rounded-lg">
          {/* Background Image */}
          <div className="absolute inset-0">
            {currentEvent.image ? (
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900"></div>
            )}
           
            
          </div>

          {/* Navigation Arrows */}
    
        </div>

        {/* Event Info Below Image */}
        <div className=" text-right m-4">
          <div className="text-sm text-gray-400 mb-2">
            {currentEvent.date && currentEvent.date.length > 0 ? (
              <>
                {formatEventDate(currentEvent.date)[0].day} {formatEventDate(currentEvent.date)[0].month} 2025
              </>
            ) : (
              "تاريخ غير متوفر"
            )}
          </div>
          <h4 className="text-white text-lg font-bold mb-4">
            {currentEvent.title}
          </h4>

          {/* CTA Button */}
          <div className="flex w-full justify-center">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[1px] rounded-lg w-11/12">
              <div className="flex bg-gray-900 px-6 py-1 rounded-lg text-white text-center hover:bg-gray-800 transition-colors items-center justify-center">
                <span className="text-sm flex items-center gap-2">
                  للمزيد
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17L7 7M7 7h6m-6 0v6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>


    </div>
  );
}
