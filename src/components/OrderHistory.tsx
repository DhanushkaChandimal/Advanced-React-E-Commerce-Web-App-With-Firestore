import { Timestamp } from 'firebase/firestore';
import { useGetOrdersById } from '../hooks/useOrder';
import { auth } from '../lib/firebaseConfig';
import type { Order } from '../types/types';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import '../styles/order-history.css'

const OrderHistory = () => {
    const { data: orders } = useGetOrdersById(auth.currentUser?.email || '');
    const formatDate = (date: Timestamp | Date): string => {
        const dateObj = date instanceof Date ? date : date.toDate();
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4 fw-bold">Order History</h2>
            <p className="text-muted mb-4">View all your previous orders and their details</p>

            <div>
                {orders?.map((order: Order) => (
                    <Card key={order.id} className="mb-4">
                        <Card.Header className="bg-primary text-white">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>Order ID:</strong> {order.id}
                                </div>
                                <Badge bg="light" text="dark">
                                    {formatDate(order.date)}
                                </Badge>
                            </div>
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

                            <h6 className="fw-bold mt-3 mb-2">Order Items:</h6>
                            <Table className="mb-0">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th className="text-end">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item) => (
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="order-item-image me-2"
                                                    />
                                                    <span>
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>
                                                <Badge bg="secondary">{item.quantity}</Badge>
                                            </td>
                                            <td className="text-end fw-bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default OrderHistory;
