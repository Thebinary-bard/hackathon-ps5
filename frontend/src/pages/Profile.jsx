import { useEffect, useState } from "react";
import { users } from "../api";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { user, refreshUser } = useAuth();
    const [form, setForm] = useState({ name: "", bio: "" });
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState(null);

    const [newSkill, setNewSkill] = useState("");
    const [addingSkill, setAddingSkill] = useState(false);
    const [skillError, setSkillError] = useState(null);

    useEffect(() => {
        if (user) setForm({ name: user.name || "", bio: user.bio || "" });
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSaveMsg(null);
        try {
            await users.updateMe(form);
            await refreshUser();
            setSaveMsg({ type: "success", text: "Profile updated!" });
        } catch (err) {
            setSaveMsg({ type: "error", text: err.message });
        } finally {
            setSaving(false);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.trim()) return;
        setAddingSkill(true);
        setSkillError(null);
        try {
            await users.addSkill(newSkill.trim());
            await refreshUser();
            setNewSkill("");
        } catch (err) {
            setSkillError(err.message);
        } finally {
            setAddingSkill(false);
        }
    };

    return (
        <Layout>
            <div className="mb-8">
                <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wide mb-1">Profile</p>
                <h1 className="text-3xl font-bold text-white">My Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: avatar + stats */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-indigo-700 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                            {user?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <h2 className="text-white font-bold text-lg">{user?.name}</h2>
                        <p className="text-gray-400 text-sm capitalize mt-1">{user?.role}</p>
                        <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

                        <div className="mt-6 space-y-3 text-left">
                            {[
                                { label: "Overall Score", value: user?.overallScore ?? "—" },
                                { label: "Reliability", value: user?.reliability ?? "—" },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-800">
                                    <span className="text-gray-400 text-sm">{label}</span>
                                    <span className="text-white font-semibold">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: edit form + skills */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Edit info */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Edit Info</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Bio</label>
                                <textarea
                                    rows={3}
                                    value={form.bio}
                                    onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                                    placeholder="Tell us about yourself..."
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none transition-all"
                                />
                            </div>
                            {saveMsg && (
                                <p className={`text-sm font-medium ${saveMsg.type === "success" ? "text-green-400" : "text-red-400"}`}>
                                    {saveMsg.text}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>

                    {/* Skills */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Skills</h2>

                        <div className="flex flex-wrap gap-2 mb-5 min-h-[36px]">
                            {user?.skills?.length > 0 ? (
                                user.skills.map((s) => (
                                    <span key={s.name || s} className="px-3 py-1 rounded-lg bg-indigo-900/40 text-indigo-300 border border-indigo-700/50 text-sm font-medium">
                                        {s.name || s}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No skills added yet.</p>
                            )}
                        </div>

                        <form onSubmit={handleAddSkill} className="flex gap-3">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a skill (e.g. React)"
                                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={addingSkill}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
                            >
                                {addingSkill ? "Adding..." : "Add"}
                            </button>
                        </form>
                        {skillError && <p className="mt-2 text-red-400 text-sm">{skillError}</p>}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
