import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: "⊞" },
    { to: "/tasks", label: "Tasks", icon: "✦" },
    { to: "/gigs", label: "Gigs", icon: "◈" },
    { to: "/profile", label: "Profile", icon: "◉" },
];

export default function Layout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => { logout(); navigate("/login"); };

    return (
        <div className="min-h-screen flex bg-gray-950 text-white">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold">S</div>
                        <span className="text-lg font-bold tracking-tight">Skillnest</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navLinks.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`
                            }
                        >
                            <span className="text-base">{icon}</span>
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 mb-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-xs font-bold uppercase">
                            {user?.name?.[0] || "U"}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold truncate">{user?.name || "User"}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role || ""}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                    >
                        ⬡ Sign out
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto px-8 py-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
