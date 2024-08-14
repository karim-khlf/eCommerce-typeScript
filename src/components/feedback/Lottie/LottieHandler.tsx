import notFound from "@assets/lottieFiles/notFounded.json";
import emptyCart from "@assets/lottieFiles/emptyCart.json";
import emptyWishlist from "@assets/lottieFiles/emptyWishlist.json";
import error from "@assets/lottieFiles/emptyWishlist.json";
import loading from "@assets/lottieFiles/loading.json";
import Lottie from "lottie-react";
const lottieFiles = {
  notFound,
  emptyCart,
  emptyWishlist,
  loading,
  error,
};

type TLottieHandler = {
  type: keyof typeof lottieFiles;
  styles?: Object;
  message?: string;
  className?: string;
};

const LottieHandler = ({
  type,
  styles,
  message,
  className,
}: TLottieHandler) => {
  const lottie = lottieFiles[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginTop: "30px" };
  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie animationData={lottie} style={styles} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
