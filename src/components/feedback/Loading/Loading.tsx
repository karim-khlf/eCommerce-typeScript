import TLoading from "@types/TLoading.types";
import React from "react";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton";
import CategorytSkeleton from "../skeletons/CategorySkeleton";

type LoadingProps = {
  loading: TLoading;
  error: null | string;
  children: React.ReactNode;
  skeletonType: keyof typeof skeletons;
};

const skeletons = {
  product: ProductSkeleton,
  cart: CartSkeleton,
  category: CategorytSkeleton,
};

const Loading = ({
  loading,
  error,
  children,
  skeletonType = "category",
}: LoadingProps) => {
  const Component = skeletons[skeletonType];
  if (loading === "pending") {
    return <Component />;
  }
  if (typeof error === "string") {
    return <p>{error}</p>;
  }
  return <div>{children}</div>;
};

export default Loading;
