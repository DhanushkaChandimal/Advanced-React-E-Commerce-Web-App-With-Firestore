import { useState, type FormEvent } from "react";
import { useCategories } from "../hooks/useProducts";
import type { Item } from "../types/types";
import "../styles/create-product.css"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

interface FormData {
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rate: string;
    count: string;
}

interface FormErrors {
    title?: string;
    price?: string;
    description?: string;
    category?: string;
    image?: string;
    rate?: string;
    count?: string;
    general?: string;
}

const CreateProduct = () => {

    const [formData, setFormData] = useState<FormData>({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rate: "",
        count: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    
    const { data: categories, isLoading: categoriesLoading } = useCategories();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Title validation
        if (!formData.title.trim()) {
            newErrors.title = "Product title is required";
        } else if (formData.title.trim().length < 3) {
            newErrors.title = "Title must be at least 3 characters";
        }

        // Price validation
        if (!formData.price.trim()) {
            newErrors.price = "Price is required";
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        } else if (formData.description.trim().length < 10) {
            newErrors.description = "Description must be at least 10 characters";
        }

        // Category validation
        if (!formData.category.trim()) {
            newErrors.category = "Category is required";
        }

        // Image validation
        if (!formData.image.trim()) {
            newErrors.image = "Image URL is required";
        }

        // Rating validation
        if (!formData.rate.trim()) {
            newErrors.rate = "Rating is required";
        }

        // Count validation
        if (!formData.count.trim()) {
            newErrors.count = "Rating count is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string: string): boolean => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) {
            return;
        }

        try {
            const productData: Item = {
                id:1,
                title: formData.title.trim(),
                price: Number(formData.price),
                description: formData.description.trim(),
                category: formData.category,
                image: formData.image.trim(),
                rating: {
                    rate: Number(formData.rate),
                    count: Number(formData.count)
                }
            };
            await addDoc(collection(db, 'products'), productData);
            alert('Data added!');
            setFormData({
                title: "",
                price: "",
                description: "",
                category: "",
                image: "",
                rate: "",
                count: ""
            });

        } catch (error) {
            console.error('Error creating product:', error);
            setErrors({ general: "An unexpected error occurred. Please try again." });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card border-0 shadow-lg p-5">
                <h2 className="fw-bold text-center mb-2">Add New Product</h2>
                <p className="text-center mb-4">Fill in the details to add a new product to your store</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Product Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            placeholder="Enter product title"
                        />
                        {errors.title && (
                            <div className="invalid-feedback">{errors.title}</div>
                        )}
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                placeholder="0.00"
                            />
                            {errors.price && (
                                <div className="invalid-feedback">{errors.price}</div>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                disabled={categoriesLoading}
                            >
                                <option value="">Select a category</option>
                                {categories?.map((category) => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <div className="invalid-feedback">{errors.category}</div>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            rows={4}
                            placeholder="Enter product description"
                        />
                        {errors.description && (
                            <div className="invalid-feedback">{errors.description}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Image URL</label>
                        <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => handleInputChange('image', e.target.value)}
                            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && (
                            <div className="invalid-feedback">{errors.image}</div>
                        )}
                        {formData.image && isValidUrl(formData.image) && (
                            <div className="mt-2">
                                <small>Preview:</small>
                                <div className="mt-1">
                                    <img 
                                        src={formData.image} 
                                        alt="Preview" 
                                        className="img-thumbnail image-preview"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Rating (0-5)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={formData.rate}
                                onChange={(e) => handleInputChange('rate', e.target.value)}
                                className={`form-control ${errors.rate ? 'is-invalid' : ''}`}
                            />
                            {errors.rate && (
                                <div className="invalid-feedback">{errors.rate}</div>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Rating Count</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.count}
                                onChange={(e) => handleInputChange('count', e.target.value)}
                                className={`form-control ${errors.count ? 'is-invalid' : ''}`}
                            />
                            {errors.count && (
                                <div className="invalid-feedback">{errors.count}</div>
                            )}
                        </div>
                    </div>

                    {errors.general && (
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.general}
                        </div>
                    )}

                    <div className="d-grid gap-2 mt-4">
                        <button 
                            type="submit" 
                            className={"btn btn-primary btn-lg"}
                        >
                            Create Product
                        </button>
                        
                        <button 
                            type="button"
                            className="btn btn-outline-secondary"
                        >
                            Reset Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;