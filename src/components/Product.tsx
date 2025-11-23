import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Item } from "../types/types";
import "../styles/product.css";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cartSlice";

const Product: React.FC<Item> = (itemDetails: Item) => {
    const [imageError, setImageError] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const placeholderImage = 'https://placehold.co/250x170';

    const handleProductClick = () => {
        navigate(`/edit-product/${itemDetails.id}`);
    };

    return (
        <Card className="h-100 shadow-sm product-card" onClick={handleProductClick}>
            <div className="product-image-container">
                <Card.Img 
                    variant="top" 
                    src={imageError ? placeholderImage : itemDetails.image}
                    className="product-image"
                    onError={() => setImageError(true)}
                    alt={itemDetails.title}
                />
            </div>
            
            <Card.Body className="d-flex flex-column product-body">
                <div className="mb-2">
                    <Badge className="product-category-badge">
                        {itemDetails.category}
                    </Badge>
                </div>

                <Card.Title className="mb-2 product-title">
                    {itemDetails.title}
                </Card.Title>

                <div className="mb-2 d-flex align-items-center">
                    <span className="product-rating-star">⭐</span>
                    <span className="product-rating">
                        {itemDetails.rating.rate.toFixed(1)}
                    </span>
                </div>

                <Card.Text className="mb-3 product-description">
                    {itemDetails.description}
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <Card.Text className="mb-0 product-price">
                        ${itemDetails.price.toFixed(2)}
                    </Card.Text>
                    
                    <Button 
                        variant="primary"
                        size="sm"
                        className="add-to-cart-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart(itemDetails));
                        }}
                    >
                        Add to Cart
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Product;