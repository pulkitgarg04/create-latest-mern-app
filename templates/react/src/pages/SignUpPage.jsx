import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { User, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();
    const navigate = useNavigate();

    const validateForm = () => {
        if (!formData.name.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) {
            const result = await signup(formData);
            if (result) navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                                <User className="size-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-4">Create Account</h1>
                            <p className="text-gray-500 text-lg">Join our community and start building</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 pl-4 flex items-center pointer-events-none">
                                    <User className="size-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="input input-icon h-12"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 pl-4 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    className="input input-icon h-12"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 pl-4 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-icon h-12"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem' }}>
                            <button type="submit" className="btn-black w-full h-12 text-lg" disabled={isSigningUp}>
                                {isSigningUp ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="size-5 animate-spin" />
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center" style={{ marginTop: '1.5rem' }}>
                        <p className="text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-black font-semibold hover:underline decoration-orange-500 decoration-2 underline-offset-4">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex auth-panel">
                <div className="auth-panel-content">
                    <div className="badge-premium mb-6">Build the Future</div>
                    <h2 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">Join the movement.</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Connect with thousands of developers and start shipping products that matter.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default SignUpPage;
