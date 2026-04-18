import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, GuestRoute } from "./components/RouteGuards";

import LoginPage    from "./pages/Login";
import RegisterPage from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";
import Dashboard    from "./pages/Dashboard";
import Tasks        from "./pages/Tasks";
import TaskDetail   from "./pages/TaskDetail";
import Gigs         from "./pages/Gigs";
import Profile      from "./pages/Profile";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* OAuth callback — no auth guard needed */}
                    <Route path="/oauth-success" element={<OAuthSuccess />} />

                    {/* Guest-only routes */}
                    <Route element={<GuestRoute />}>
                        <Route path="/login"    element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard"   element={<Dashboard />} />
                        <Route path="/tasks"        element={<Tasks />} />
                        <Route path="/tasks/:id"    element={<TaskDetail />} />
                        <Route path="/gigs"         element={<Gigs />} />
                        <Route path="/profile"      element={<Profile />} />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
