import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import GridList from "@components/shared/GridList/GridList";
import { Heading } from "@components/shared";
import useCategories from "@hooks/use-Categories";

const Categories = () => {
  const { records, loading, error } = useCategories();

  return (
    <Container>
      <Heading title="categories" />
      <Loading loading={loading} error={error} skeletonType="category">
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
