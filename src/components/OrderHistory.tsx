import Container from 'react-bootstrap/Container';
import '../styles/order-history.css';

const OrderHistory = () => {
    

    return (
        <Container className="py-4">
            <h2 className="mb-4 fw-bold">Order History</h2>
            <p className="text-muted mb-4">View all your previous orders and their details</p>
        </Container>
    );
};

export default OrderHistory;
