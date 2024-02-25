import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { ROUTES } from './routes';
import { MainPage, ErrorPage, LayersPage } from '@pages';

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.INDEX,
        element: <MainPage />,
      },
      {
        path: ROUTES.LAYERS,
        element: <LayersPage />,
      },
    ],
  },
]);

export { ROUTES } from './routes';
