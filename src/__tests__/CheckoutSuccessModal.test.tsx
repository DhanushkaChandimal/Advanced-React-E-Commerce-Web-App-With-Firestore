import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckoutSuccessModal from '../components/CheckoutSuccessModal';

describe('CheckoutSuccessModal Component', () => {
  test('displays order details correctly', () => {
    const mockOrderDetails = {
      orderNumber: 'ORD-123456',
      totalItems: 3,
      totalAmount: 99.99
    };

    const mockOnClose = jest.fn();

    render(
      <CheckoutSuccessModal
        show={true}
        orderDetails={mockOrderDetails}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(/Order Successful!/i)).toBeInTheDocument();
    expect(screen.getByText(/ORD-123456/i)).toBeInTheDocument();
    expect(screen.getByText(/Items Purchased:/i)).toBeInTheDocument();
    expect(screen.getByText(/\$99\.99/i)).toBeInTheDocument();
  });
});
