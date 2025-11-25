import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import type { RootState } from '../redux/store';
import CartItem from './CartItem';
import ConfirmationModal from './ConfirmationModal';
import CheckoutSuccessModal from './CheckoutSuccessModal';
import { clearCart } from '../redux/cartSlice';
import { useCreateOrder } from '../hooks/useOrder';
import type { Order } from '../types/types';
import { auth } from '../lib/firebaseConfig';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cart);
    const [showClearModal, setShowClearModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        totalItems: 0,
        totalAmount: 0,
        orderNumber: ''
    });
    const currentUser = auth.currentUser;

    const { mutate: createOrder, isPending } = useCreateOrder();
    
    const TAX_RATE = 0.10;
    const taxAmount = totalPrice * TAX_RATE;
    const finalAmount = totalPrice + taxAmount;

    const generateOrderNumber = () => {
        return 'ORD-' + Date.now().toString();
    };

    const handleCheckout = async () => {
        const orderNum = generateOrderNumber();
        setOrderDetails({
            totalItems,
            totalAmount: finalAmount,
            orderNumber: orderNum
        });

        const orderData: Order = {
            id: orderNum,
            userId: currentUser?.email || '',
            totalItems: totalItems,
            totalAmount: finalAmount,
            items: items,
            date: new Date(),
        };

        createOrder(orderData, {
            onSuccess: () => {
                dispatch(clearCart());
                setShowSuccessModal(true);
            }
        });
    };

    return (
        <Container className="py-4">
            <h2 className="text-center mb-4">Your Cart</h2>
            {items.length === 0 ? (
                <div className="text-center">
                    <p className="text-muted">No items in cart</p>
                </div>
            ) : (
                <Row>
                    <Col lg={8}>
                        <div className="d-flex flex-column gap-3">
                            {items.map((item) => (
                                <CartItem key={item.id} {...item}/>
                            ))}
                            {items.length > 0 && (
                                <Button 
                                    variant="light" 
                                    className="border-0 bg-light text-muted py-3 rounded-3"
                                    onClick={()=>setShowClearModal(true)}
                                >
                                    🗑️ Clear Cart
                                </Button>
                            )}
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="sticky-top">
                            <Card.Header>
                                <h5 className="mb-0">Order Summary</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Total Items:</span>
                                    <span className="fw-bold">{totalItems}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Tax (10%):</span>
                                    <span>${taxAmount.toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="fw-bold">Total Amount:</span>
                                    <span className="fw-bold text-primary fs-5">${finalAmount.toFixed(2)}</span>
                                </div>
                                <div className="d-grid">
                                    <Button 
                                        variant="success" 
                                        size="lg"
                                        onClick={handleCheckout}
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Processing...
                                            </>
                                        ) : (
                                            'Proceed to Checkout'
                                        )}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            <ConfirmationModal
                show={showClearModal}
                title="Clear Cart"
                message="Are you sure you want to remove all items from your cart? This action cannot be undone."
                onConfirm={()=>{
                    dispatch(clearCart());
                    setShowClearModal(false);
                }}
                onCancel={()=>setShowClearModal(false)}
            />

            <CheckoutSuccessModal
                show={showSuccessModal}
                orderDetails={orderDetails}
                onClose={()=>setShowSuccessModal(false)}
            />
        </Container>
    );
};

export default Cart;
