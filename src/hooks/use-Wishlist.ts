import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetWishlistProductsByIds from "@store/wishlist/act/actGetWishlistProductsByIds";
import { productsInfosCleanUp } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfos, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  useEffect(() => {
    const promise = dispatch(actGetWishlistProductsByIds("productsFullInfos"));
    return () => {
      dispatch(productsInfosCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  const cartItems = useAppSelector((state) => state.cart.items);

  const products = productsFullInfos.map((el) => {
    return { ...el, isLiked: true, quantity: cartItems[el.id] };
  });
  return { productsFullInfos, loading, error, products };
};
export default useWishlist;
