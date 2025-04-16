const StripePaymentPage = async ({ params }: { params: { id: string } }) => {
    const response = await fetch(`http://localhost:3000/api/payments/payment-sessions/${params.id}`);
    const json = await response.json();
     
}

export default StripePaymentPage;