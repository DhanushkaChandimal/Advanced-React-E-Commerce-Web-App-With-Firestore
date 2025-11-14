import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        console.log(formData);
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(
                auth, 
                formData.email, 
                formData.password
            );

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            alert("Registration successful!");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            console.log(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card border-0 shadow-lg p-5">
                <h2 className="h3 fw-bold text-center">Create Account</h2>
                <p className="text-muted text-center">Join us and start shopping today!</p>

                <form onSubmit={handleRegister}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                placeholder="Enter your first name"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type={"password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <input
                            type={"password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`btn btn-primary btn-lg w-100 mt-4`}
                    >
                        Create Account
                    </button>
                </form>

                <small className="text-muted text-center mt-4">
                    Already have an account? <span role="button" className="text-primary text-decoration-underline">Sign in here</span>
                </small>
            </div>
        </div>
    );
};

export default Register;
