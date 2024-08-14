import HeaderCounter from "./HeaderCounter/HeaderCounter";
import CartIcon from "@assets/svg/cart.svg?react";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import { useAppSelector } from "@store/hooks";
import getCartItemsTotalNumber from "@store/selectors";
import styles from "./styles.module.css";

const HeaderLeftBar = () => {
  const cartTotalQuantity = useAppSelector(getCartItemsTotalNumber);
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsIds
  ).length;
  return (
    <div className={styles.headerLeftBar}>
      <HeaderCounter
        to="wishlist"
        title="wishlist"
        svgIcon={<WishlistIcon title="wishlist icon" />}
        totalQuantity={wishlistTotalQuantity}
      />
      <HeaderCounter
        to="cart"
        title="cart"
        svgIcon={<CartIcon title="basket icon" />}
        totalQuantity={cartTotalQuantity}
      />
    </div>
  );
};

export default HeaderLeftBar;
