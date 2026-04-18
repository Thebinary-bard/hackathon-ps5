import { useEffect, useState } from "react";
import { gigs, matching } from "../api";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Gigs() {
    const { user } = useAuth();
    const isStudent = user?.role === "student";
    const [gigList, setGigList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applying, setApplying] = useState(null);

    // Company: create gig form
    // Gig model: title (req), description (req), skill (req string), requirements (string[])
    const [createForm, setCreateForm] = useState({ title: "", description: "", skill: "", requirements: "" });
    const [creating, setCreating] = useState(false);

    // Matches
    const [matchMap, setMatchMap] = useState({});
    const [loadingMatches, setLoadingMatches] = useState(null);

    useEffect(() => {
        gigs.list()
            .then((res) => setGigList(res.data || []))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const handleApply = async (gigId) => {
        setApplying(gigId);
        try {
            await gigs.apply(gigId);
            alert("Applied successfully!");
        } catch (err) {
            alert(err.message);
        } finally {
            setApplying(null);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const body = {
                title: createForm.title,
                description: createForm.description,
                skill: createForm.skill,
                requirements: createForm.requirements
                    ? createForm.requirements.split(",").map((s) => s.trim()).filter(Boolean)
                    : [],
            };
            const res = await gigs.create(body);
            setGigList((g) => [res.data, ...g]);
            setCreateForm({ title: "", description: "", skill: "", requirements: "" });
        } catch (err) {
            alert(err.message);
        } finally {
            setCreating(false);
        }
    };

    const loadMatches = async (gigId) => {
        setLoadingMatches(gigId);
        try {
            const res = await matching.getForGig(gigId);
            setMatchMap((m) => ({ ...m, [gigId]: res.data }));
        } catch (err) {
            alert(err.message);
        } finally {
            setLoadingMatches(null);
        }
    };

    return (
        <Layout>
            <div className="mb-8">
                <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wide mb-1">Gigs</p>
                <h1 className="text-3xl font-bold text-white">
                    {isStudent ? "Available Gigs" : "Manage Gigs"}
                </h1>
            </div>

            {/* Company: Create Gig */}
            {!isStudent && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4">➕ Post New Gig</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <input
                            type="text"
                            required
                            value={createForm.title}
                            onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
                            placeholder="Gig title"
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                        />
                        <textarea
                            required
                            value={createForm.description}
                            onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                            placeholder="Gig description..."
                            rows={3}
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
                        />
                        <input
                            type="text"
                            required
                            value={createForm.skill}
                            onChange={(e) => setCreateForm((f) => ({ ...f, skill: e.target.value }))}
                            placeholder="Primary skill required (e.g. React)"
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            value={createForm.requirements}
                            onChange={(e) => setCreateForm((f) => ({ ...f, requirements: e.target.value }))}
                            placeholder="Additional requirements (optional, comma-separated)"
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                            type="submit"
                            disabled={creating}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
                        >
                            {creating ? "Posting..." : "Post Gig"}
                        </button>
                    </form>
                </div>
            )}

            {/* Gigs list */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : gigList.length === 0 ? (
                <div className="text-center py-16 text-gray-500">No gigs yet.</div>
            ) : (
                <div className="space-y-4">
                    {gigList.map((gig) => (
                        <div key={gig._id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                    <h3 className="text-white font-semibold text-lg">{gig.title}</h3>
                                    <p className="text-gray-400 text-sm mt-1">{gig.description}</p>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize shrink-0 ${
                                    gig.status === "open"
                                        ? "bg-green-900/50 text-green-300 border-green-700/50"
                                        : "bg-gray-700/50 text-gray-400 border-gray-600/50"
                                }`}>{gig.status || "open"}</span>
                            </div>

                            {/* Skill badge */}
                            {gig.skill && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-0.5 rounded-md text-xs bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">{gig.skill}</span>
                                    {gig.requirements?.map((r) => (
                                        <span key={r} className="px-2.5 py-0.5 rounded-md text-xs bg-gray-800 text-gray-300 border border-gray-700">{r}</span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-3 flex-wrap">
                                {isStudent ? (
                                    <button
                                        onClick={() => handleApply(gig._id)}
                                        disabled={applying === gig._id}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
                                    >
                                        {applying === gig._id ? "Applying..." : "Apply Now"}
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => loadMatches(gig._id)}
                                            disabled={loadingMatches === gig._id}
                                            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
                                        >
                                            {loadingMatches === gig._id ? "Loading..." : "View Matches"}
                                        </button>
                                        <GigStatusSelect gig={gig} onUpdate={setGigList} />
                                    </>
                                )}
                            </div>

                            {/* Match results */}
                            {matchMap[gig._id] && (
                                <div className="mt-4 border-t border-gray-800 pt-4">
                                    <p className="text-sm font-semibold text-gray-300 mb-3">Top Matches</p>
                                    {matchMap[gig._id].length === 0 ? (
                                        <p className="text-gray-500 text-sm">No matching candidates found.</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {matchMap[gig._id].map((m) => (
                                                <div key={m.userId} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2.5">
                                                    <div>
                                                        <p className="text-white font-medium text-sm">{m.name}</p>
                                                        <p className="text-gray-400 text-xs">{m.skills?.join(", ")}</p>
                                                    </div>
                                                    <span className="text-indigo-300 font-semibold text-sm">Score: {m.matchScore}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
}

function GigStatusSelect({ gig, onUpdate }) {
    const [val, setVal] = useState(gig.status || "open");
    const [saving, setSaving] = useState(false);

    const handleChange = async (e) => {
        const status = e.target.value;
        setVal(status);
        setSaving(true);
        try {
            await gigs.updateStatus(gig._id, status);
            onUpdate((list) => list.map((g) => g._id === gig._id ? { ...g, status } : g));
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <select
            value={val}
            onChange={handleChange}
            disabled={saving}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm focus:outline-none"
        >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>
    );
}
