/**
 * Node modules
 */

import { createBrowserRouter } from 'react-router';

/**
 * pages
 */
import HomePages from '@/pages/HomePages';
import RegisterPages from '@/pages/RegisterPages';
import LoginPages from '@/pages/LoginPages';
import AuthSyncPages from '@/pages/AuthSyncPages';
import InboxPages from '@/pages/InboxPages';
/**
 * Layouts
 */
import RootLayout from '@/layouts/RootLayout';
import AppLayout from '@/layouts/AppLayout';
/**
 * Error boundaries
 */
import RootErrorBondary from '@/pages/RootErrorBondary';

/**
 * Actions
 */
import appActions from '@/routes/actions/appActions';

/**
 * Loader
 */
import inboxTaskLoader from '@/routes/loaders/inboxLoader';
/**
 * Types
 */
import type { RouteObject } from 'react-router';
const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePages />,
  },
  {
    path: 'register',
    element: <RegisterPages />,
  },
  {
    path: 'login',
    element: <LoginPages />,
  },
  {
    path: 'auth-sync',
    element: <AuthSyncPages />,
  },
];

const appRouteChildren: RouteObject[] = [
  {
    path: 'inbox',
    element: <InboxPages />,
    loader: inboxTaskLoader,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBondary />,
    children: rootRouteChildren,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: appRouteChildren,
    action: appActions,
  },
]);

export default router;
