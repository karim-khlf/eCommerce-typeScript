import { lazy, Suspense } from "react";

import RootLayout from "@layouts/MainLayout/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LottieHandler from "@components/feedback/Lottie/LottieHandler";
import Login from "@pages/Login";
import Register from "@pages/Register";
import ProtectedRoute from "@components/auth/ProtectedRoute";

const Categories = lazy(() => import("@pages/Categories"));
const About = lazy(() => import("@pages/About"));
const Index = lazy(() => import("@pages/Index"));
const Products = lazy(() => import("@pages/Products"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Profile = lazy(() => import("@pages/Profile"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LottieHandler type="loading" />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LottieHandler type="loading" />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LottieHandler type="loading" />}>
            <Index />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<LottieHandler type="loading" />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "wishlist",
        element: (
          <Suspense fallback={<LottieHandler type="loading" />}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<LottieHandler type="loading" />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <Suspense fallback={<LottieHandler type="loading" />}>
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },

      {
        path: "about-us",
        element: (
          <Suspense fallback={<LottieHandler type="loading" />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LottieHandler type="loading" />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LottieHandler type="loading" />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler type="loading" />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
