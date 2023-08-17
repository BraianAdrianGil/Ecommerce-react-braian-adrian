import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";
import Purchases from "../pages/Purchases/Purchases";
import Profile from "../pages/Profile/Profile";
import Home from "../pages/Home/Home";
import { homeLoader } from "./loaders/homeLoader";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/purchases",
        element: (
          <ProtectedRoute>
            <Purchases />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <p>Page not founded 404</p>,
  },
]);
