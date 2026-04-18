import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../api";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await auth.register(form);
            // Auto-login after register
            const res = await auth.login({ email: form.email, password: form.password });
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
                <div className="flex items-center gap-2 mb-10 justify-center">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">S</div>
                    <span className="text-xl font-bold text-white tracking-tight">Skillnest</span>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
                    <p className="text-gray-400 text-sm mb-8">Join Skillnest to get started.</p>

                    {error && (
                        <div className="mb-5 px-4 py-3 rounded-xl bg-red-900/30 border border-red-700/50 text-red-400 text-sm">{error}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                            <input
                                id="reg-name"
                                type="text"
                                required
                                value={form.name}
                                onChange={set("name")}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                            <input
                                id="reg-email"
                                type="email"
                                required
                                value={form.email}
                                onChange={set("email")}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                            <input
                                id="reg-password"
                                type="password"
                                required
                                minLength={6}
                                value={form.password}
                                onChange={set("password")}
                                placeholder="At least 6 characters"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">I am a…</label>
                            <div className="flex gap-3">
                                {["student", "business"].map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setForm((f) => ({ ...f, role: r }))}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all capitalize ${
                                            form.role === r
                                                ? "bg-indigo-600 border-indigo-500 text-white"
                                                : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
                                        }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            id="register-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
