import CartItemList from "@components/CartItemList/CartItemList";
import { Loading } from "@components/feedback";
import LottieHandler from "@components/feedback/Lottie/LottieHandler";
import { Heading } from "@components/shared";
import useCart from "@hooks/use-Cart";

const Cart = () => {
  const {
    productsFullInfos,
    loading,
    error,
    productsWithQuantity,
    changeQuantityHandler,
    deleteItemHandler,
  } = useCart();
  return (
    <>
      <Heading title="your cart" />
      <Loading loading={loading} error={error} skeletonType="cart">
        {productsFullInfos.length > 0 ? (
          <CartItemList
            products={productsWithQuantity}
            changeQuantityHandler={changeQuantityHandler}
            deleteItemHandler={deleteItemHandler}
          />
        ) : (
          <LottieHandler
            type="emptyCart"
            styles={{ width: "280px", margin: "auto" }}
          />
        )}
      </Loading>
    </>
  );
};

export default Cart;
