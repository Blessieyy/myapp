import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../PaymentForm';


// Load your Stripe publishable key
const stripePromise = loadStripe('your-publishable-key-here');

const StripeWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default StripeWrapper;
