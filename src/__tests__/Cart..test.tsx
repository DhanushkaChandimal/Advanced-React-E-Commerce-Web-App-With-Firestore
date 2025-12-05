import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import Product from '../components/Product';
import Cart from '../components/Cart';
import type { Item } from '../types/types';

jest.mock('../lib/firebaseConfig', () => ({
  db: {},
  auth: {
    currentUser: {
      email: 'test@example.com'
    }
  }
}));

jest.mock('../hooks/useOrder', () => ({
  useCreateOrder: () => ({
    mutate: jest.fn(),
    isPending: false
  })
}));

describe('Cart Integration Test', () => {
  const mockProduct: Item = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'Test description',
    category: 'electronics',
    image: 'https://example.com/product.jpg',
    rating: { rate: 4.5, count: 120 }
  };

  test('cart updates when product is added', async () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer
      }
    });

    const { rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Product {...mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Items:/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Subtotal:')).toBeInTheDocument();
    const state = store.getState();
    expect(state.cart.totalItems).toBe(1);
    expect(state.cart.totalPrice).toBe(29.99);
  });
});
