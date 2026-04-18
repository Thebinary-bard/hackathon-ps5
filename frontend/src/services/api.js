const BASE_URL = "http://localhost:5000/api";

export const api = {
    login: (data) =>
        fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }),

    register: (data) =>
        fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }),

    getTasks: () =>
        fetch(`${BASE_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),
};