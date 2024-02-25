import { MainLayout } from '@layout';
import { Outlet } from 'react-router-dom';
import { AppModals } from '@components';

export const App = () => {
  return (
    <MainLayout>
      <AppModals />
      <Outlet />
    </MainLayout>
  );
};
