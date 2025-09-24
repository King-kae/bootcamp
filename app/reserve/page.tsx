// app/reserve/page.tsx
import { getAllOptions } from "@/libs/apiCalls";
import ReservationForm from "@/components/ReservationForm";

export default async function ReservePage() {
  const options = await getAllOptions();

  return <ReservationForm options={options} />;
}
