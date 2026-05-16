'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import styles from './checkout.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'US'
  });
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items }),
      });

      const data = await res.json();

      if (res.ok) {
        setClientSecret(data.clientSecret);
      } else {
        console.error('Checkout API Error:', data);
        setError(data.message || 'Something went wrong.');
      }
    } catch (err: any) {
      console.error('Checkout Network Error:', err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const theme = useCartStore((state) => state.theme);

  const appearance = { 
    theme: (theme === 'dark' ? 'night' : 'stripe') as const,
    variables: {
      colorPrimary: '#0071e3',
      fontFamily: 'Outfit, sans-serif',
      borderRadius: '12px',
    }
  };
  const options = { clientSecret, appearance };

  if (clientSecret) {
    return (
      <main className={styles.container}>
        <div className={styles.checkoutBox}>
          <h1 className={styles.title}>Payment Details</h1>
          <p className={styles.summary}>Order Total: <strong>${total.toFixed(2)}</strong></p>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.checkoutLayout}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>Checkout</h1>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className={styles.field}>
                  <label>Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              
              <div className={styles.field}>
                <label>Email Address</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className={styles.field}>
                <label>Street Address</label>
                <input name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>City</label>
                  <input name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className={styles.field}>
                  <label>Postcode</label>
                  <input name="postcode" value={formData.postcode} onChange={handleChange} required />
                </div>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'Securing payment...' : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          )}
        </div>

        <div className={styles.summarySection}>
          <h2 className={styles.subtitle}>Order Summary</h2>
          <div className={styles.orderItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalPrice}>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
