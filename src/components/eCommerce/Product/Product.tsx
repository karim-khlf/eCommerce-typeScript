import { TProduct } from "@types";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";

// react
import { memo, useCallback, useEffect, useState } from "react";

// bootstrap
import { Button, Modal, Spinner } from "react-bootstrap";

// styles
import styles from "./styles.module.css";
import actToggleLike from "@store/wishlist/act/actToggleLike";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    id,
    img,
    title,
    price,
    max,
    quantity,
    isLiked,
    isAuthenticated = true,
  }: TProduct) => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const currentRemainingNumber = max - (quantity ?? 0);
    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }
      const undisabled = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);
      return () => {
        clearTimeout(undisabled);
      };
    }, [isBtnDisabled]);

    const dispatch = useAppDispatch();
    const addToCartHandler = (id: number) => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    const toggleLikeHundler = useCallback(() => {
      if (isAuthenticated) {
        if (!loading) {
          setLoading(true);
          dispatch(actToggleLike(id))
            .unwrap()
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
        }
      } else {
        setShowModal(true);
      }
    }, [dispatch]);
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
        <div className={product}>
          <div className={wishlistBtn} onClick={toggleLikeHundler}>
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <h2>{title}</h2>
          <p className={maximumNotice}>
            {currentRemainingNumber <= 0
              ? "you reach to the limit"
              : `you can add ${currentRemainingNumber} item(s)`}
          </p>
          <h3>{price} EGP</h3>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={() => addToCartHandler(id)}
            disabled={isBtnDisabled || currentRemainingNumber <= 0}
          >
            {isBtnDisabled ? (
              <>
                <Spinner size="sm" animation="border" /> Loading...
              </>
            ) : (
              " Add to cart"
            )}
          </Button>
        </div>
      </>
    );
  }
);

export default Product;
