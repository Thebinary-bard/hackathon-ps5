import { useEffect, useState } from "react";
import { tasks } from "../api";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Badge({ text, color = "indigo" }) {
    const map = {
        indigo: "bg-indigo-900/50 text-indigo-300 border-indigo-700/50",
        green: "bg-green-900/50 text-green-300 border-green-700/50",
        amber: "bg-amber-900/50 text-amber-300 border-amber-700/50",
    };
    return (
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[color] || map.indigo}`}>
            {text}
        </span>
    );
}

export default function Tasks() {
    const { user } = useAuth();
    const isStudent = user?.role === "student";
    const [taskList, setTaskList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Generate AI task
    const [skill, setSkill] = useState("");
    const [difficulty, setDifficulty] = useState("medium");
    const [generating, setGenerating] = useState(false);
    const [genResult, setGenResult] = useState(null);
    const [genError, setGenError] = useState(null);

    // Create task (company)
    const [createForm, setCreateForm] = useState({ title: "", description: "", requirements: "", difficulty: "medium" });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        tasks.list()
            .then((res) => setTaskList(res.data || []))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setGenError(null);
        setGenResult(null);
        setGenerating(true);
        try {
            const res = await tasks.generate(skill, difficulty);
            setGenResult(res.data);
        } catch (err) {
            setGenError(err.message);
        } finally {
            setGenerating(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await tasks.create(createForm);
            setTaskList((t) => [res.data, ...t]);
            setCreateForm({ title: "", description: "", requirements: "", difficulty: "medium" });
        } catch (err) {
            alert(err.message);
        } finally {
            setCreating(false);
        }
    };

    return (
        <Layout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wide mb-1">Tasks</p>
                    <h1 className="text-3xl font-bold text-white">
                        {isStudent ? "AI Task Generator" : "Manage Tasks"}
                    </h1>
                </div>
            </div>

            {/* Student: AI Generate */}
            {isStudent && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4">⚡ Generate AI Task</h2>
                    <form onSubmit={handleGenerate} className="flex gap-3 flex-wrap">
                        <input
                            type="text"
                            required
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            placeholder="Enter a skill (e.g. React, Python)"
                            className="flex-1 min-w-[200px] px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
                        />
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <button
                            type="submit"
                            disabled={generating}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
                        >
                            {generating ? "Generating..." : "Generate"}
                        </button>
                    </form>

                    {genError && <p className="mt-3 text-red-400 text-sm">{genError}</p>}

                    {genResult && (
                        <div className="mt-5 border border-indigo-500/30 bg-indigo-600/5 rounded-xl p-5">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-white font-semibold text-lg">{genResult.title}</h3>
                                <Badge text={genResult.difficulty || difficulty} />
                            </div>
                            <p className="text-gray-300 text-sm mb-3">{genResult.description}</p>
                            {genResult.requirements && (
                                <p className="text-gray-400 text-sm">
                                    <span className="text-gray-300 font-medium">Requirements: </span>
                                    {genResult.requirements}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Company: Create Task */}
            {!isStudent && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4">➕ Create New Task</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <input
                            type="text"
                            required
                            value={createForm.title}
                            onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
                            placeholder="Task title"
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                        />
                        <textarea
                            required
                            value={createForm.description}
                            onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                            placeholder="Task description..."
                            rows={3}
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
                        />
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={createForm.requirements}
                                onChange={(e) => setCreateForm((f) => ({ ...f, requirements: e.target.value }))}
                                placeholder="Requirements (optional)"
                                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                            />
                            <select
                                value={createForm.difficulty}
                                onChange={(e) => setCreateForm((f) => ({ ...f, difficulty: e.target.value }))}
                                className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={creating}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
                        >
                            {creating ? "Creating..." : "Create Task"}
                        </button>
                    </form>
                </div>
            )}

            {/* Tasks list */}
            <h2 className="text-lg font-semibold text-white mb-4">All Tasks</h2>
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : taskList.length === 0 ? (
                <div className="text-center py-16 text-gray-500">No tasks yet.</div>
            ) : (
                <div className="space-y-3">
                    {taskList.map((task) => (
                        <Link
                            key={task._id}
                            to={`/tasks/${task._id}`}
                            className="block bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-5 transition-all group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-white font-semibold group-hover:text-indigo-300 transition-colors">{task.title}</h3>
                                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{task.description}</p>
                                </div>
                                <Badge
                                    text={task.difficulty}
                                    color={task.difficulty === "hard" ? "amber" : task.difficulty === "easy" ? "green" : "indigo"}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </Layout>
    );
}
