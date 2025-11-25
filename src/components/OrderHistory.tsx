import { useGetOrdersById } from '../hooks/useOrder';
import { auth } from '../lib/firebaseConfig';
import type { Order } from '../types/types';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const OrderHistory = () => {
    const { data: orders } = useGetOrdersById(auth.currentUser?.email || '');

    return (
        <Container className="py-4">
            <h2 className="mb-4 fw-bold">Order History</h2>
            <p className="text-muted mb-4">View all your previous orders and their details</p>

            <div>
                {orders?.map((order: Order) => (
                    <Card key={order.id} className="mb-4">
                        <Card.Header className="bg-primary text-white">
                            <strong>Order ID:</strong> {order.id}
                        </Card.Header>
                        <Card.Body>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <p className="mb-2">
                                        <strong>Total Items: </strong>
                                        <Badge bg="info">{order.totalItems}</Badge>
                                    </p>
                                </div>
                                <div className="col-md-6 text-md-end">
                                    <p className="mb-2">
                                        <strong>Total Amount: </strong>
                                        <span className="text-success fw-bold fs-5">
                                            ${order.totalAmount.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default OrderHistory;
