import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create a Stripe Checkout Session
// @route   POST /api/payments/checkout
// @access  Public
export const createCheckoutSession = async (req, res) => {
  const { movieTitle, numTickets, price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Movie Ticket: ${movieTitle}`,
            },
            unit_amount: price * 100, // Convert dollars to cents
          },
          quantity: numTickets,
        },
      ],
      mode: "payment",
      success_url: "https://oasiscinema.netlify.app/success",
      cancel_url: "https://oasiscinema.netlify.app/cancel",
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
