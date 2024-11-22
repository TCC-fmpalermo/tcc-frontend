import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Toaster } from 'sonner';

export const AppLayout = () => (
  <>
    <Sidebar />
    <Outlet />
    <Toaster />
  </>
);