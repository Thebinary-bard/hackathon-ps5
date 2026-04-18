import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../api";
import { useAuth } from "../context/AuthContext";

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.81 15.69 17.61V20.35H19.26C21.35 18.43 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12 23C14.97 23 17.46 22.02 19.26 20.35L15.69 17.61C14.71 18.27 13.46 18.66 12 18.66C9.17 18.66 6.78 16.74 5.94 14.18H2.26V17.03C4.05 20.58 7.72 23 12 23Z" fill="#34A853"/>
        <path d="M5.94 14.18C5.73 13.52 5.6 12.78 5.6 12C5.6 11.22 5.73 10.48 5.94 9.82V6.97H2.26C1.51 8.46 1.09 10.17 1.09 12C1.09 13.83 1.51 15.54 2.26 17.03L5.94 14.18Z" fill="#FBBC05"/>
        <path d="M12 5.34C13.62 5.34 15.07 5.9 16.21 6.98L19.34 3.85C17.46 2.09 14.97 1 12 1C7.72 1 4.05 3.42 2.26 6.97L5.94 9.82C6.78 7.26 9.17 5.34 12 5.34Z" fill="#EA4335"/>
    </svg>
);

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await auth.login({ email, password });
            login(res.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-10 justify-center">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">S</div>
                    <span className="text-xl font-bold text-white tracking-tight">Skillnest</span>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
                    <p className="text-gray-400 text-sm mb-8">Sign in to your account to continue.</p>

                    {error && (
                        <div className="mb-5 px-4 py-3 rounded-xl bg-red-900/30 border border-red-700/50 text-red-400 text-sm">{error}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                            <input
                                id="login-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                            <input
                                id="login-password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                            />
                        </div>

                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <hr className="flex-1 border-gray-700" />
                        <span className="text-xs text-gray-500">or</span>
                        <hr className="flex-1 border-gray-700" />
                    </div>

                    <button
                        id="google-login-btn"
                        type="button"
                        onClick={() => window.location.assign(auth.googleUrl())}
                        className="w-full flex items-center justify-center gap-2 py-3 border border-gray-700 rounded-xl text-sm font-semibold text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                        <GoogleIcon /> Continue with Google
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
