import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { tasks, submissions } from "../api";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function TaskDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        tasks.get(id)
            .then((res) => setTask(res.data))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);
        try {
            await submissions.create(id, content);
            setSubmitted(true);
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout>
            <Link to="/tasks" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
                ← Back to Tasks
            </Link>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : task ? (
                <div className="max-w-2xl">
                    <div className="flex items-start gap-3 mb-6">
                        <h1 className="text-3xl font-bold text-white flex-1">{task.title}</h1>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 capitalize mt-1">
                            {task.difficulty}
                        </span>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Description</h2>
                        <p className="text-gray-200 leading-relaxed">{task.description}</p>
                        {task.requirements && (
                            <>
                                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mt-5 mb-2">Requirements</h2>
                                <p className="text-gray-200">{task.requirements}</p>
                            </>
                        )}
                    </div>

                    {/* Submission form — students only */}
                    {user?.role === "student" && (
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Submit Your Work</h2>

                            {submitted ? (
                                <div className="text-center py-8 text-green-400 font-semibold">
                                    ✓ Submission received!
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <textarea
                                        required
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Paste your solution, GitHub link, or explanation..."
                                        rows={6}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none transition-all"
                                    />
                                    {submitError && <p className="text-red-400 text-sm">{submitError}</p>}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
                                    >
                                        {submitting ? "Submitting..." : "Submit"}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            ) : null}
        </Layout>
    );
}
