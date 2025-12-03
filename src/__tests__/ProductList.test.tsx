import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

jest.mock('../lib/firebaseConfig', () => ({
  db: {},
  auth: {}
}));

jest.mock('../hooks/useProducts', () => ({
  useProducts: () => ({ 
    data: [
      {
        id: 1,
        title: 'Test Product 1',
        price: 29.99,
        description: 'Test description 1',
        category: 'electronics',
        image: 'https://example.com/product1.jpg',
        rating: { rate: 4.5, count: 120 },
      },
      {
        id: 2,
        title: 'Test Product 2',
        price: 49.99,
        description: 'Test description 2',
        category: 'electronics',
        image: 'https://example.com/product2.jpg',
        rating: { rate: 4.0, count: 80 },
      },
    ], 
    isLoading: false, 
    error: null 
  }),
  useCategories: () => ({ data: ['electronics'], isLoading: false }),
  useCategory: () => ({ data: [], isLoading: false }),
}));

describe('ProductList Component', () => {
  test('displays products', async () => {
    const queryClient = new QueryClient();

    const { findByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ProductList />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );

    expect(await findByText(/Test Product 1/i)).toBeInTheDocument();
    expect(await findByText(/Test Product 2/i)).toBeInTheDocument();
  });
});