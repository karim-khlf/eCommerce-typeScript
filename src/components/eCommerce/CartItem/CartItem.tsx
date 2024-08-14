import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import TProduct from "@customTypes/TProduct";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;
type TCartItemProps = TProduct & {
  selectQuantityHandler: (quantity: number, id: number) => void;
  deleteItemHandler: (id: number) => void;
};

const CartItem = ({
  id,
  img,
  title,
  price,
  max,
  quantity,
  selectQuantityHandler,
  deleteItemHandler,
}: TCartItemProps) => {
  const options = Array(max)
    .fill(0)
    .map((_, index) => {
      console.log();
      return (
        <option value={index + 1} key={index + 1}>
          {index + 1}
        </option>
      );
    });
  const selectQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const quantity = +event.target.value;
    selectQuantityHandler(id, quantity);
  };

  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price} EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
            onClick={() => deleteItemHandler(id)}
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select onChange={selectQuantity} value={quantity}>
          {options}
        </Form.Select>
      </div>
    </div>
  );
};

export default CartItem;
