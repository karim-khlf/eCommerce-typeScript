import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useProducts = () => {
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const { itemsIds } = useAppSelector((state) => state.wishlist);
  const { accessToken } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(prefix as string));
    return () => {
      dispatch(productsCleanUp());
      promise.abort;
    };
  }, [dispatch]);
  const cartItems = useAppSelector((state) => state.cart.items);
  const productsFullInfos = records.map((el) => {
    return {
      ...el,
      quantity: cartItems[el.id],
      isLiked: itemsIds.includes(el.id),
      isAuthenticated: !!accessToken,
    };
  });
  return { productsFullInfos, loading, error, prefix };
};
export default useProducts;
