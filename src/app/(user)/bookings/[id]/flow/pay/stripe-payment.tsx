'use client';

import { Button } from '@/components/ui/button';
import SpinnerLoading from '@/components/ui/spinner-loading';
import { Elements, useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CheckoutForm = () => {
    const params = useParams();
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `http://localhost:3001/bookings/${params.id}/flow/complete`,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage('error');
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className='flex flex-col gap-4 p-6'>
            <PaymentElement id="payment-element" options={{ layout: 'accordion' }} />
            <Button
                variant='default'
                className='py-6 cursor-pointer'
                disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Thanh toán"}
                </span>
            </Button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

const stripePromise = await loadStripe('pk_test_51RCyp4PJAxphXxp3tKVcmp5y8uuiefJdAdCGPzEN4nAJWoh8YmVBes0FyrRcUtItqZmue4OIbhlsAUx8KNzWHKGY00VzCFpKtF');

export default function StripePayment({ clientSecret }: { clientSecret: string }) {
    const [isClient, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    if (!isClient) {
        return <SpinnerLoading />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
            {clientSecret && clientSecret !== "" && <Elements options={{ clientSecret }} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>}
        </div>)
}
