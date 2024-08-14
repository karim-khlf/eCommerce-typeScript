import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import GridList from "@components/shared/GridList/GridList";
import TProduct from "@types/TProduct.types";
import { Heading } from "@components/shared";
import useProducts from "@hooks/use-Products";
const Products = () => {
  const { productsFullInfos, loading, error, prefix } = useProducts();
  return (
    <Container>
      <Heading title={`${prefix} Products`} />
      <Loading loading={loading} error={error} skeletonType="product">
        <GridList
          records={productsFullInfos}
          renderItem={(record: TProduct) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};
export default Products;
