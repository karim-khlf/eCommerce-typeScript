import CartItem from "@components/eCommerce/CartItem/CartItem";
import TProduct from "@customTypes/TProduct";

type TCartItemListProps = {
  products: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  deleteItemHandler: (id: number) => void;
};

const CartItemList = ({
  products,
  changeQuantityHandler,
  deleteItemHandler,
}: TCartItemListProps) => {
  return products.map((product) => {
    return (
      <CartItem
        {...product}
        key={product.id}
        selectQuantityHandler={changeQuantityHandler}
        deleteItemHandler={deleteItemHandler}
      />
    );
  });
};

export default CartItemList;
