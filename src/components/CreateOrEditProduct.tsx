import { useState, type FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategories, useCreateProduct, useUpdateProduct, useProducts, useDeleteProduct } from "../hooks/useProducts";
import type { Item } from "../types/types";
import "../styles/create-product.css"

type CreateProductData = Omit<Item, 'id'>;

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

const CreateOrEditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: products } = useProducts();
    
    const product = id ? products?.find(p => p.id === Number(id)) : undefined;
    const isEditMode = !!product;

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
    
    const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();
    const { data: categories, isLoading: categoriesLoading } = useCategories();
    
    const isPending = isCreating || isUpdating;

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price.toString(),
                description: product.description,
                category: product.category,
                image: product.image,
                rate: product.rating.rate.toString(),
                count: product.rating.count.toString()
            });
        }
    }, [product]);

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
            if (isEditMode && product) {
                const updatedProduct: Item = {
                    id: product.id,
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

                updateProduct(updatedProduct, {
                    onSuccess: () => {
                        alert('Product updated successfully!');
                        navigate('/products');
                    }
                });
            } else {
                const productData: CreateProductData = {
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

                createProduct(productData, {
                    onSuccess: () => {
                        alert('Product created successfully!');
                        setFormData({
                            title: "",
                            price: "",
                            description: "",
                            category: "",
                            image: "",
                            rate: "",
                            count: ""
                        });
                    }
                });
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} product:`, error);
            setErrors({ general: "An unexpected error occurred. Please try again." });
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            price: "",
            description: "",
            category: "",
            image: "",
            rate: "",
            count: ""
        });
        setErrors({});
    };

    const handleDelete = () => {
        if (product) {
            deleteProduct(product.id, {
                onSuccess: () => {
                    alert('Product deleted successfully!');
                    navigate('/products');
                },
                onError: (error) => {
                    console.error('Error deleting product:', error);
                    alert('Failed to delete product. Please try again.');
                }
            });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card border-0 shadow-lg p-5">
                <h2 className="fw-bold text-center mb-2">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
                <p className="text-center mb-4">{isEditMode ? 'Update the product details' : 'Fill in the details to add a new product to your store'}</p>

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
                            disabled={isPending}
                            className={"btn btn-primary btn-lg"}
                        >
                            {isPending ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    {isEditMode ? 'Updating Product...' : 'Creating Product...'}
                                </>
                            ) : (
                                isEditMode ? 'Update Product' : 'Create Product'
                            )}
                        </button>
                        
                        <button 
                            type="button"
                            className="btn btn-outline-secondary"
                            disabled={isPending}
                            onClick={resetForm}
                        >
                            Reset Form
                        </button>

                        {isEditMode && (
                            <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDelete()}
                            >
                                Delete Product
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOrEditProduct;