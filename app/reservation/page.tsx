import { getAllOptions } from "@/libs/apiCalls";
import PaymentClientPage from "@/components/PaymentClientPage";

export default async function PaymentPage() {
  const options = await getAllOptions(); // ✅ allowed here
  return <PaymentClientPage options={options} />;
}
