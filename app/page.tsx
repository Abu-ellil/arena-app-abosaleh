"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EventSlider from "./components/EventSlider";
import NewsletterSection from "./components/NewsletterSection";
import HelpCenter from "./components/HelpCenter";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string[];
  venue: string;
  category: string;
  image?: string;
  time?: string;
  formattedDate?: string;
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get gradient based on category
  const getGradientForCategory = (category: string) => {
    const gradients = {
      "حفل موسيقي": "from-purple-900 to-pink-900",
      "الحفلات الموسيقية": "from-orange-900 to-red-900",
      مسرحية: "from-blue-900 to-indigo-900",
      رياضة: "from-green-900 to-teal-900",
      كوميديا: "from-yellow-900 to-orange-900",
      ثقافي: "from-indigo-900 to-purple-900",
    };
    return (
      gradients[category as keyof typeof gradients] ||
      "from-gray-900 to-slate-900"
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("🔍 Fetching events...");
        const response = await fetch("/api/events");
        console.log("📡 Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Events data received:", data.length, "events");
          setEvents(
            data.map((event: any) => ({
              ...event,
              formattedDate: (() => {
                if (!event.date || event.date.length === 0) return '';

                const dates = event.date.map((d: string) => new Date(d));
                dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());

                const firstDate = dates[0];
                const lastDate = dates[dates.length - 1];

                const firstDay = firstDate.toLocaleDateString('en-US', { day: 'numeric' });
                const firstMonthEnglish = firstDate.toLocaleDateString('en-US', { month: 'long' });
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
                const firstMonth = arabicMonthNames[firstMonthEnglish];
                const firstYear = firstDate.toLocaleDateString('en-US', { year: 'numeric' });

                if (dates.length === 1) {
                  return `${firstDay} ${firstMonth} ${firstYear}`;
                } else {
                  const lastDay = lastDate.toLocaleDateString('en-US', { day: 'numeric' });
                  const lastMonthEnglish = lastDate.toLocaleDateString('en-US', { month: 'long' });
                  const lastMonth = arabicMonthNames[lastMonthEnglish];
                  const lastYear = lastDate.toLocaleDateString('en-US', { year: 'numeric' });

                  if (firstMonth === lastMonth && firstYear === lastYear) {
                    return `${firstDay}-${lastDay} ${firstMonth} ${firstYear}`;
                  } else if (firstYear === lastYear) {
                    return `${firstDay} ${firstMonth} - ${lastDay} ${lastMonth} ${firstYear}`;
                  } else {
                    return `${firstDay} ${firstMonth} ${firstYear} - ${lastDay} ${lastMonth} ${lastYear}`;
                  }
                }
              })(),
              time: event.date.map((d: string) =>
                new Date(d).toLocaleTimeString("ar-SA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              ),
            }))
          );
        } else {
          console.error(
            "❌ Failed to fetch events:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("❌ Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Group events by category
  const groupedEvents = events.reduce((acc, event) => {
    const category = event.category || "فعاليات أخرى";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  // Define category order with "الحفلات الموسيقية" first
  const categoryOrder = [
    "الحفلات الموسيقية",
    "حفل موسيقي",
    "مسرحية",
    "رياضة",
    "كوميديا",
    "ثقافي",
    "فعاليات أخرى",
  ];

  // Sort categories according to the defined order
  const sortedCategories = Object.keys(groupedEvents).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // If category is not in the order list, put it at the end
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  return (
    <div className="min-h-screen bg-gray-900">


      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {/* Real Events from Database */}
      <div className="">
        {sortedCategories.map((category) => {
          const categoryEvents = groupedEvents[category];
          return (
            <div key={category} className=" ">
              <EventSlider title={category} category={category} />
              <div key={category} className="mb-8 relative overflow-hidden ">
                {/* Moving blur gradient background */}
                <div className="absolute inset-0">
                  <div className="absolute h-56 inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-yellow-400 opacity-90 animate-gradient-x blur-3xl"></div>
                  <div className="absolute h-56 inset-0 bg-gradient-to-br from-blue-900 via-slate-600 to-orange-400 opacity-60 animate-gradient-x-reverse blur-2xl"></div>
                  <div className="absolute h-56 inset-0 bg-gradient-to-tr from-indigo-900 via-gray-700 to-yellow-400 opacity-40 animate-pulse blur-xl"></div>
                </div>
                <div className="relative z-10 p-4">
                  {/* Category-specific EventSlider */}



                  <h1 className="py-10  text-2xl">الفعاليات القادمة</h1>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {categoryEvents.map((event) => (
                      <Link key={event.id} href={`/event/${event.id}`}>
                        <div className="mb-4">
                          {/* Event Image */}
                          <div
                            className={`relative bg-gradient-to-r ${getGradientForCategory(
                              event.category
                            )} rounded-lg overflow-hidden aspect-[1/1]`}
                          >
                            {/* Background Image if available */}
                            {event.image && (
                              <div
                                className="absolute inset-0 bg-cover bg-center h-full"
                                style={{ backgroundImage: `url(${event.image})` }}
                              />
                            )}

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          </div>

                          {/* Event Details Below Image */}
                          <div className="flex flex-col justify-between mt-3 text-right h-32 bg-gray-800 p-4 rounded-bl-xl rounded-br-xl">
                            <div className="text-sm text-gray-500">
                              
                                <span className="block">
                                   {event.formattedDate}
                                </span>
                           
                            </div>
                            <h3 className="text-xs font-bold mb-1">{event.title}</h3>


                            {/* CTA Button */}
                            <div className="flex w-full justify-center">
                              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[1px] rounded-lg w-full">
                                <div className="flex bg-gray-800 px-2 py-2 rounded-lg text-white text-center hover:bg-gray-800 transition-colors items-center justify-center">
                                  <span className="text-xs flex items-center gap-2">
                                    شراء التذاكر
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17L7 7M7 7h6m-6 0v6" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}







                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Show message if no events */}
        {!loading && events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">لا توجد فعاليات متاحة حالياً</p>
            <Link
              href="/admin/login"
              className="text-primary hover:text-primary/80 text-sm"
            >
              إضافة فعالية جديدة
            </Link>
          </div>
        )}
      </div>

      <HelpCenter />
      <NewsletterSection />
      {/* Admin Link */}
      <div className="fixed bottom-4 left-4">
        <Link
          href="/admin/login"
          className="bg-gray-100/10 text-gray-800 px-1 py-1 rounded-lg text-sm backdrop-blur-sm shadow-sm"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
