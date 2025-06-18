import Stripe from 'stripe';
import env from 'dotenv';
env.config(); // Load environment variables from .env file
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // your Stripe secret key in .env

export default stripe;
