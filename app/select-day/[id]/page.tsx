// app/event/[id]/select-day/page.tsx

import SelectDayClientPage from "./SelectDayClientPage";

interface SelectDayPageProps {
  params: { id: string };
}

export default function SelectDayPage({ params }: SelectDayPageProps) {
  return <SelectDayClientPage eventId={params.id} />;
}
