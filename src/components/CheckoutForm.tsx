'use client';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'An unexpected error occurred.');
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} data-testid="stripe-payment-form">
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        style={{
          marginTop: '1.5rem',
          width: '100%',
          padding: '1.25rem',
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)',
          border: 'none',
          borderRadius: '16px',
          fontWeight: '700',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner">Processing...</div> : "Complete Payment"}
        </span>
      </button>
      {message && <div id="payment-message" style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>{message}</div>}
    </form>
  );
}
