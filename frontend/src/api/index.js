/**
 * Centralized API client
 * - All regular calls go through /api (proxied by Vite → localhost:5000)
 * - OAuth redirect goes directly to VITE_BACKEND_URL (not proxied)
 */

const API_BASE = "/api";

function getToken() {
    return localStorage.getItem("token");
}

async function request(method, path, body) {
    const headers = { "Content-Type": "application/json" };
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(data?.message || `Request failed (${res.status})`);
    }

    return data;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const auth = {
    register: (body) => request("POST", "/auth/register", body),
    login: (body) => request("POST", "/auth/login", body),
    googleUrl: () => {
        const base = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000").replace(/\/+$/, "");
        return `${base}/api/auth/google`;
    },
};

// ─── Users ───────────────────────────────────────────────────────────────────
export const users = {
    me: () => request("GET", "/users/me"),
    updateMe: (body) => request("PUT", "/users/me", body),
    addSkill: (skill) => request("POST", "/users/skills", { skill }),
};

// ─── Tasks ───────────────────────────────────────────────────────────────────
export const tasks = {
    generate: (skill, difficulty) => request("POST", "/tasks/generate", { skill, difficulty }),
    list: () => request("GET", "/tasks"),
    get: (id) => request("GET", `/tasks/${id}`),
    create: (body) => request("POST", "/tasks", body),
};

// ─── Submissions ─────────────────────────────────────────────────────────────
export const submissions = {
    create: (taskId, content) => request("POST", "/submissions", { taskId, content }),
    evaluate: (id) => request("POST", `/submissions/${id}/evaluate`),
};

// ─── Gigs ────────────────────────────────────────────────────────────────────
export const gigs = {
    create: (body) => request("POST", "/gigs", body),
    list: () => request("GET", "/gigs"),
    get: (id) => request("GET", `/gigs/${id}`),
    apply: (id) => request("POST", `/gigs/${id}/apply`),
    updateStatus: (id, status) => request("PUT", `/gigs/${id}/status`, { status }),
};

// ─── Matching ─────────────────────────────────────────────────────────────────
export const matching = {
    getForGig: (gigId) => request("GET", `/matching/${gigId}`),
};

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const reviews = {
    add: (body) => request("POST", "/reviews", body),
    getForUser: (userId) => request("GET", `/reviews/${userId}`),
};

// ─── AI ──────────────────────────────────────────────────────────────────────
export const ai = {
    ask: (query) => request("POST", "/ai", { query }),
};
