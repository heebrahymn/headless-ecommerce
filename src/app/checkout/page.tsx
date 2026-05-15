'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const [email, setEmail] = useState('');
  const [stripeReady, setStripeReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Hit API route to check inventory (uncached) and create pending Woo order
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, items }),
      });

      const data = await res.json();

      if (res.ok) {
        setStripeReady(true);
      } else {
        setError(data.message || 'Something went wrong. Please check your inventory or try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (stripeReady) {
    return (
      <main style={{ padding: '4rem', textAlign: 'center' }}>
        <div data-testid="stripe-payment-form" style={{ padding: '2rem', border: '2px dashed #ccc' }}>
          <h2>Stripe Payment Form Placeholder</h2>
          <p>This is where the Stripe Elements would be mounted.</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Checkout</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3>Your Items:</h3>
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name} x {item.quantity} - ${item.price * item.quantity}</li>
              ))}
            </ul>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              data-testid="email-input" 
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button 
            type="submit" 
            data-testid="checkout-submit"
            disabled={loading}
            style={{ 
              padding: '1rem', 
              backgroundColor: '#000', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      )}
    </main>
  );
}
