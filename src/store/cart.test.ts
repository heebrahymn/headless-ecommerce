import { useCartStore } from './cart';

describe('Cart Store', () => {
  it('adds items to the cart', () => {
    // Access the state directly for testing
    const addItem = useCartStore.getState().addItem;
    expect(useCartStore.getState().items.length).toBe(0);
    
    addItem({ id: '1', name: 'Shirt', price: 20, quantity: 1 });
    
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0].name).toBe('Shirt');
  });
});
