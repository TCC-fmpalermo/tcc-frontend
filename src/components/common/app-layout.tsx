import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';

export const AppLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);