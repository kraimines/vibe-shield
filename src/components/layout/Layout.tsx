import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useRole } from '@/hooks/useRole';

export default function Layout() {
  const { user } = useRole();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-background dot-grid">
      <div className="fixed inset-0 scanline z-0" />
      <Sidebar />
      <div className="flex-1 ml-[60px] md:ml-[240px] flex flex-col relative z-10">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
