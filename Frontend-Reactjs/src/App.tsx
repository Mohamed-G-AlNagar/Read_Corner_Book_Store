import { ReactElement } from 'react';
import './App.css'
import { HomePage } from './Layouts/HomePage/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Layouts/login/Login';
import NotFound from './Layouts/NotFound/NotFound';
import Signup from './Layouts/signup/Signup';
import MainLayout from './Layouts/MainLayout/MainLayout';
import { VerifyEmail } from './Layouts/VerifyEmail/VerifyEmail';
import { BookDetailsAndFeedbacks } from './Layouts/BookDetails/BookDetailsAndFeedbacks';
import ProtectedRoutes from './ProtectRoutes/ProtectRoutes';
import Cart from './Layouts/cart/Cart';
import {PaymentSuccess} from './Layouts/Payment/PaymentSuccess';
import { PaymentCanceled } from './Layouts/Payment/PaymentCanceled';
import FilterProductsPage from './Layouts/BooksPage/FilterProductsPage';
import UserAndAdminPanel from './Layouts/BooksManagementPage/UserAndAdminPanel';
import ForgotPassword from './Layouts/ResetPassword/ForgotPassword';
import ResetPassword from './Layouts/ResetPassword/UpdatePassword';

type RouteObject = {
  path: string;
  element: ReactElement;
  children?: RouteObject[];
};
// prettier-ignore
const routes: RouteObject[] = [
  {path: "",element: <MainLayout />,children: [
      { path: "", element: <HomePage /> },
      { path: "/cart", element: <ProtectedRoutes> <Cart /></ProtectedRoutes> },
      { path: "/controlPanel", element: <ProtectedRoutes> <UserAndAdminPanel /></ProtectedRoutes> },
      { path: "/book/:id", element: <BookDetailsAndFeedbacks /> },
      { path: "/booksFilter", element: <FilterProductsPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgotPassword", element: <ForgotPassword /> },
  { path: "/resetPassword/:code", element: <ResetPassword /> },
  { path: "/verifyEmail/:token", element: <VerifyEmail /> },
  { path: "/order/success", element: <ProtectedRoutes><PaymentSuccess /></ProtectedRoutes> },
  { path: "/order/cancel", element: <ProtectedRoutes><PaymentCanceled /></ProtectedRoutes> },

];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
