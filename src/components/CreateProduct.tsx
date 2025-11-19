import { useState } from "react";

interface FormData {
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rate: string;
    count: string;
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

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card border-0 shadow-lg p-5">
                <h2 className="fw-bold text-center mb-2">Add New Product</h2>
                <p className="text-center mb-4">Fill in the details to add a new product to your store</p>

                <form>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Product Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className={"form-control"}
                            placeholder="Enter product title"
                        />
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
                                className={"form-control"}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className={"form-control"}
                            >
                                <option value="">Select a category</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className={"form-control"}
                            rows={4}
                            placeholder="Enter product description"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Image URL</label>
                        <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => handleInputChange('image', e.target.value)}
                            className={"form-control"}
                            placeholder="https://example.com/image.jpg"
                        />
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
                                className={"form-control"}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Rating Count</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.count}
                                onChange={(e) => handleInputChange('count', e.target.value)}
                                className={"form-control"}
                            />
                        </div>
                    </div>

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