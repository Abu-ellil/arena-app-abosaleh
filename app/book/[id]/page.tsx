import SeatSelection from "./seat-selection";

import { useSearchParams } from 'next/navigation';

interface BookingPageProps {
  params: {
    id: string;
  };
  searchParams: {
    date?: string;
  };
}

export default function BookingPage({ params, searchParams }: BookingPageProps) {
  const selectedDate = searchParams.date;
  return <SeatSelection eventId={params.id} selectedDate={selectedDate} />;
}
