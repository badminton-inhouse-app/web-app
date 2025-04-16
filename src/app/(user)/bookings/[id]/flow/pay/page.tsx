import { baseAxios } from "@/services/api/baseAxios";
import { PaymentSession } from "@/types/entities";
import { notFound } from "next/navigation";
import StripePayment from "./stripe-payment";

export default async function BookingPaymentNagvigationPage({ params }: { params: { id: string } }) {
    const response = await baseAxios(`/bookings/${params.id}/payment-session`);
    const data = response.data as PaymentSession;

    if (!data) {
        return notFound();
    }

    switch (data.paymentMethod) {
        case 'STRIPE':
            return <StripePayment clientSecret={data.clientSecret} />;
        default:
            return <div>Unknown</div>
    }
}