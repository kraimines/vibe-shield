import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "@/hooks/useRole";
import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login";
import ChatPage from "@/pages/ChatPage";
import EmployeeDashboard from "@/pages/EmployeeDashboard";
import ManagerDashboard from "@/pages/ManagerDashboard";
import DirectionDashboard from "@/pages/DirectionDashboard";
import SimulatorPage from "@/pages/SimulatorPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";
import { useRole } from "@/hooks/useRole";

const queryClient = new QueryClient();

function DashboardRouter() {
  const { user } = useRole();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'direction') return <DirectionDashboard />;
  if (user.role === 'manager') return <ManagerDashboard />;
  return <EmployeeDashboard />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/team" element={<ManagerDashboard />} />
            <Route path="/direction" element={<DirectionDashboard />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
