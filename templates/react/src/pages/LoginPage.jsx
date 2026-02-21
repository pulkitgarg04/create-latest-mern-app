import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = login(formData);
        if (result) navigate("/dashboard");
    };

    return (
        <div className="h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-4">Welcome Back</h1>
                            <p className="text-gray-500 text-lg">Enter your details to access your account</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
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
                                    <Lock className="h-5 w-5 text-gray-400" />
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
                            <button type="submit" className="btn-black w-full h-12 text-lg" disabled={isLoggingIn}>
                                {isLoggingIn ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center" style={{ marginTop: '1.5rem' }}>
                        <p className="text-gray-500">
                            New here?{" "}
                            <Link to="/signup" className="text-black font-semibold hover:underline decoration-orange-500 decoration-2 underline-offset-4">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex auth-panel">
                <div className="auth-panel-content">
                    <div className="badge-premium mb-6">MERN Stack Pro</div>
                    <h2 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">Scale your vision.</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Experience the power of a modern stack designed for speed, security, and developer happiness.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
