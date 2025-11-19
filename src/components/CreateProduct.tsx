
const CreateProduct = () => {

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
                            className={"form-control"}
                            placeholder="Enter product title"
                        />
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Price ($)</label>
                            <input
                                type="number"
                                className={"form-control"}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Category</label>
                            <select
                                className={"form-control"}
                            >
                                <option value="">Select a category</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea
                            className={"form-control"}
                            rows={4}
                            placeholder="Enter product description"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Image URL</label>
                        <input
                            type="url"
                            className={"form-control"}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Rating (0-5)</label>
                            <input
                                type="number"
                                className={"form-control"}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Rating Count</label>
                            <input
                                type="number"
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