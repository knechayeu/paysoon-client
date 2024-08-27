import {
  createBrowserRouter,
} from 'react-router-dom';
import { Home, Profile } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
]);