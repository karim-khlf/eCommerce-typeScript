import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/shared";
import { TProduct } from "@types";
import useWishlist from "@hooks/use-Wishlist";
import LottieHandler from "@components/feedback/Lottie/LottieHandler";

const Wishlist = () => {
  const { loading, error, products } = useWishlist();
  {
    return products.length ? (
      <>
        <Heading title="your wishlist" />
        <Loading loading={loading} error={error} skeletonType="product">
          <GridList
            records={products}
            renderItem={(record: TProduct) => <Product {...record} />}
          />
        </Loading>
      </>
    ) : (
      <LottieHandler
        type="emptyWishlist"
        styles={{ width: "300px", margin: "auto" }}
      />
    );
  }
};

export default Wishlist;
