describe('Checkout Flow', () => {
  it('adds an item to cart and completes checkout', () => {
    // 1. Visit product page
    cy.visit('/product/test-shirt');
    
    // 2. Add to cart
    cy.get('[data-testid="add-to-cart"]').click();
    
    // 3. Verify cart state
    cy.get('[data-testid="cart-count"]').should('contain', '1');
    
    // 4. Go to checkout
    cy.visit('/checkout');
    
    // 5. Fill out form and submit
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="checkout-submit"]').click();
    
    // 6. Verify pending payment state
    cy.get('[data-testid="stripe-payment-form"]').should('exist');
  });
});
