import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import type { AuthUser } from "../types/types";
import { useCreateUser } from "../hooks/useAuth";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

interface RegisterProps {
    onSwitchToSignIn?: () => void;
}

const Register = ({ onSwitchToSignIn }: RegisterProps) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const { mutate: createUser } = useCreateUser();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // First name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "First name must be at least 2 characters";
        }

        // Last name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters";
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const userData: AuthUser = {
                id: formData.email.trim(),
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
            };

            createUser(userData);

            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                formData.email, 
                formData.password
            );

            await updateProfile(userCredential.user, {
                displayName: `${formData.firstName} ${formData.lastName}`
            });

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
            setErrors({general: errorMessage});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light p-4">
            <div className="card border-0 shadow-lg p-5">
                <h2 className="h3 fw-bold text-center mb-2">Create Account</h2>
                <p className="text-muted text-center mb-4">Join us and start shopping today!</p>

                <form onSubmit={handleRegister}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && (
                                <div className="invalid-feedback">{errors.firstName}</div>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && (
                                <div className="invalid-feedback">{errors.lastName}</div>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "👀" : "👁️‍🗨️"}
                            </button>
                            {errors.password && (
                                <div className="invalid-feedback d-block">{errors.password}</div>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <div className="input-group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "👀" : "👁️‍🗨️"}
                            </button>
                            {errors.confirmPassword && (
                                <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
                            )}
                        </div>
                    </div>

                    {errors.general && (
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.general}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`btn btn-primary btn-lg w-100 mt-4`}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <small className="text-muted text-center mt-4">
                    Already have an account? <span 
                        role="button" 
                        className="text-primary text-decoration-underline"
                        onClick={onSwitchToSignIn}
                    >
                        Sign in here
                    </span>
                </small>
            </div>
        </div>
    );
};

export default Register;
