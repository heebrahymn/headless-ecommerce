import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import wooApi from '@/lib/woocommerce-rest';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_dummy', {
  apiVersion: '2025-02-11-preview' as any,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, items, firstName, lastName, address, city, state, postcode, country } = body;

    if (!email || !items || items.length === 0) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    // 1. Create WooCommerce Order
    const wooOrderData = {
      payment_method: "stripe",
      payment_method_title: "Credit Card (Stripe)",
      set_paid: false,
      billing: {
        first_name: firstName || "Guest",
        last_name: lastName || "User",
        address_1: address || "",
        city: city || "",
        state: state || "",
        postcode: postcode || "",
        country: country || "US",
        email: email
      },
      line_items: items.map((item: any) => ({
        product_id: item.databaseId,
        quantity: item.quantity
      }))
    };

    console.log('Sending Order to WooCommerce:', JSON.stringify(wooOrderData, null, 2));

    let order;
    try {
      const response = await wooApi.post("orders", wooOrderData);
      order = response.data;
      console.log('✅ WooCommerce Order Created successfully:', order.id);
    } catch (err: any) {
      console.error('❌ WooCommerce Order Error:', err.response?.data || err.message);
      return NextResponse.json({ 
        message: `WooCommerce Error: ${err.response?.data?.message || err.message}` 
      }, { status: 500 });
    }

    // 2. Create Stripe PaymentIntent
    try {
      const amount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity * 100), 0);

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        receipt_email: email,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          woo_order_id: order.id.toString(),
        }
      });

      return NextResponse.json({ 
        clientSecret: paymentIntent.client_secret,
        orderId: order.id
      });
    } catch (stripeErr: any) {
      console.error('❌ Stripe Error (Order was still created in Woo):', stripeErr.message);
      return NextResponse.json({ 
        message: `Stripe Error: ${stripeErr.message}. Note: WooCommerce Order #${order.id} was successfully created.`,
        orderId: order.id,
        isStripeError: true
      }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ 
      message: error.response?.data?.message || error.message 
    }, { status: 500 });
  }
}
