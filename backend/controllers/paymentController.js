const stripe = require('stripe')('sk_test_51PhB4JA4YDBsTrPZrPWTuHlbVbkLMblMpv27HDCK9g11nhYyyreUhu9X1yWafZRU8tJC1vItngshMC8F6Bff5Q8R00h8YHyby2');

// Payment controller function
const createPaymentSession = async (req, res) => {
    const { package } = req.body; // Extract package from request body

    try {
        // Create a product using package name
        const product = await stripe.products.create({
            name: package.name,
        });

        // Create a price using package price
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: package.price * 100, // Convert INR to paise
            currency: 'inr',
        });

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer_email: 'demo@gmail.com', // Optional: Use the user's email if you have it
        });

        // Respond with the session URL
        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating payment session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createPaymentSession };
