import actGetProductsByIds from "@store/cart/act/actGetProductsByIds";
import {
  cartProductsInfosCleaUp,
  changeQuantity,
  deleteItem,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetProductsByIds());
    return () => {
      dispatch(cartProductsInfosCleaUp());
      promise.abort();
    };
  }, [dispatch]);

  const { items, productsFullInfos, loading, error } = useAppSelector(
    (state) => state.cart
  );
  const productsWithQuantity = productsFullInfos.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(changeQuantity({ quantity, id }));
    },
    [dispatch]
  );

  const deleteItemHandler = useCallback(
    (id: number) => {
      dispatch(deleteItem(id));
    },
    [dispatch]
  );
  return {
    items,
    productsFullInfos,
    loading,
    error,
    productsWithQuantity,
    changeQuantityHandler,
    deleteItemHandler,
  };
};
export default useCart;
