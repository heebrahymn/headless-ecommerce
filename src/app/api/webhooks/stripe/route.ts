import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import wooApi from '@/lib/woocommerce-rest';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_dummy', {
  apiVersion: '2025-02-11-preview' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const wooOrderId = paymentIntent.metadata.woo_order_id;

      if (wooOrderId) {
        console.log(`Payment succeeded for Order ID: ${wooOrderId}`);
        
        try {
          // Update WooCommerce Order status
          await wooApi.put(`orders/${wooOrderId}`, {
            status: 'processing',
            set_paid: true,
            transaction_id: paymentIntent.id
          });
          console.log(`WooCommerce Order ${wooOrderId} updated to processing.`);
        } catch (error) {
          console.error(`Error updating WooCommerce Order ${wooOrderId}:`, error);
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
