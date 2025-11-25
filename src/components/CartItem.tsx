import "../styles/cart.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import type React from "react";
import { useState } from "react";
import type { CartItem as CartItemType } from "../types/types";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/cartSlice";
import ConfirmationModal from "./ConfirmationModal";
import Container from "react-bootstrap/Container";

const CartItem: React.FC<CartItemType> = (product: CartItemType) => {
    const dispatch = useDispatch();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
        }
    };

    const handleDecreaseQuantity = () => {
        if (product.quantity === 1) {
            setShowConfirmModal(true);
        } else {
            handleQuantityChange(product.quantity - 1);
        }
    };

    const handleConfirmRemove = () => {
        dispatch(removeFromCart(product.id));
        setShowConfirmModal(false);
    };

    return (
        <Container>
            <Card className="d-flex flex-row align-items-center justify-content-between pe-3 cart-item">
                <Card.Body className="d-flex align-items-center gap-4">
                    <Card.Img variant="top" src={product.image} className="cart-image"/>
                    <Card.Text>{product.title}</Card.Text>
                </Card.Body>
                <Card.Title className="me-2">${(product.price * product.quantity).toFixed(2)}</Card.Title>
                <div className="d-flex align-items-center border rounded-pill overflow-hidden">
                    <Button 
                        variant="light" 
                        size="sm"
                        className="border-0 rounded-0 px-3"
                        onClick={handleDecreaseQuantity}
                    >
                        −
                    </Button>
                    <span className="fw-bold px-3 bg-light text-center" style={{minWidth: '50px'}}>{product.quantity}</span>
                    <Button 
                        variant="light" 
                        size="sm"
                        className="border-0 rounded-0 px-3"
                        onClick={() => handleQuantityChange(product.quantity + 1)}
                    >
                        +
                    </Button>
                </div>
            </Card>

            <ConfirmationModal
                show={showConfirmModal}
                title="Remove Item"
                message={`Are you sure you want to remove "${product.title}" from your cart?`}
                onConfirm={handleConfirmRemove}
                onCancel={()=>setShowConfirmModal(false)}
            />
        </Container>
    );
}

export default CartItem