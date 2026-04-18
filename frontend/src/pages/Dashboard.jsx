import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { user } = useAuth();
    const isStudent = user?.role === "student";

    const studentCards = [
        { to: "/tasks", label: "Browse Tasks", desc: "Find AI-generated tasks matching your skills", icon: "✦", color: "indigo" },
        { to: "/gigs", label: "Browse Gigs", desc: "Discover real gigs posted by companies", icon: "◈", color: "violet" },
        { to: "/profile", label: "My Profile", desc: "Manage your skills and portfolio", icon: "◉", color: "cyan" },
    ];

    const companyCards = [
        { to: "/gigs/new", label: "Post a Gig", desc: "Create a new gig listing for students", icon: "◈", color: "violet" },
        { to: "/gigs", label: "My Gigs", desc: "View and manage your posted gigs", icon: "◈", color: "indigo" },
        { to: "/tasks/new", label: "Create Task", desc: "Add a custom task for students", icon: "✦", color: "cyan" },
    ];

    const cards = isStudent ? studentCards : companyCards;

    const colorMap = {
        indigo: "bg-indigo-600/10 border-indigo-500/30 hover:border-indigo-500/60",
        violet: "bg-violet-600/10 border-violet-500/30 hover:border-violet-500/60",
        cyan: "bg-cyan-600/10 border-cyan-500/30 hover:border-cyan-500/60",
    };
    const iconColorMap = {
        indigo: "bg-indigo-600 text-white",
        violet: "bg-violet-600 text-white",
        cyan: "bg-cyan-600 text-white",
    };

    return (
        <Layout>
            {/* Header */}
            <div className="mb-10">
                <p className="text-indigo-400 text-sm font-semibold tracking-wide uppercase mb-1">Dashboard</p>
                <h1 className="text-3xl font-bold text-white">
                    Hello, {user?.name?.split(" ")[0]} 👋
                </h1>
                <p className="text-gray-400 mt-2">
                    {isStudent
                        ? "Here's what's available for you today."
                        : "Manage your gigs and find the best talent."}
                </p>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                    { label: "Skills", value: user?.skills?.length ?? 0 },
                    { label: "Overall Score", value: user?.overallScore ?? "—" },
                    { label: "Reliability", value: user?.reliability ?? "—" },
                ].map(({ label, value }) => (
                    <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4">
                        <p className="text-gray-400 text-xs font-medium mb-1">{label}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                    </div>
                ))}
            </div>

            {/* Quick-action cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map(({ to, label, desc, icon, color }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`group border rounded-2xl p-6 transition-all duration-200 ${colorMap[color]}`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${iconColorMap[color]}`}>
                            {icon}
                        </div>
                        <h3 className="text-white font-semibold mb-1">{label}</h3>
                        <p className="text-gray-400 text-sm">{desc}</p>
                    </Link>
                ))}
            </div>
        </Layout>
    );
}
