import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import CartItem from '../components/CartItem';

describe('CartItem Component', () => {
  const mockStore = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'Test description',
    category: 'electronics',
    image: 'https://example.com/product.jpg',
    rating: { rate: 4.5, count: 120 },
    quantity: 2,
  };

  test('displays product information correctly', () => {
    render(
      <Provider store={mockStore}>
        <CartItem {...mockProduct} />
      </Provider>
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$59\.98/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('displays increase and decrease buttons for user interaction', () => {
    render(
      <Provider store={mockStore}>
        <CartItem {...mockProduct} />
      </Provider>
    );

    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('−')).toBeInTheDocument();
  });

  test('increases quantity when plus button is clicked', () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: [mockProduct],
          totalItems: mockProduct.quantity,
          totalPrice: mockProduct.price * mockProduct.quantity
        }
      }
    });

    render(
      <Provider store={store}>
        <CartItem {...mockProduct} />
      </Provider>
    );

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);

    const state = store.getState();
    const updatedItem = state.cart.items.find(item => item.id === mockProduct.id);
    
    expect(updatedItem?.quantity).toBe(3);
    expect(state.cart.totalItems).toBe(3);
  });
});
