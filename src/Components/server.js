// server.js (Node.js backend)

const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('your-secret-key');
const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { paymentMethodId, amount } = req.body;

        // Create a PaymentIntent with the payment method ID and amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'R',
            payment_method: paymentMethodId,
            confirm: true,
        });

        res.send({
            success: true,
            paymentIntent,
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
