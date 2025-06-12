import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';
dotenv.config();

const Environment = paypal.core.SandboxEnvironment;
const client = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID_TEST,
    process.env.PAYPAL_SECRET_TEST
  )
);

export { client as paypalClient };
