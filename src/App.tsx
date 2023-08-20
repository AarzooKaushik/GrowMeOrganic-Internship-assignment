import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import HomePage from './pages/homePage';
import Login from './pages/loginPage';
import { ReactNode } from 'react';
import { LoaderFunction } from 'react-router-dom';
import Error from './pages/errorPage';

export interface RouteObject {
  path: string;
  element: ReactNode;
  loader?: LoaderFunction; 
  errorElement?: ReactNode;
}

const checkAuthLoader: RouteObject['loader'] = async () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return redirect('/');
  }
  return null;
};


const routes: RouteObject[] = [
  { path: '/', element: <Login /> },
  {
    path: '/homepage',
    element: <HomePage />,
    loader: checkAuthLoader,
    errorElement: <Error />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
