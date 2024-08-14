import React from "react";
import { Col, Row } from "react-bootstrap";
type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

const GridList = <T extends { id?: number }>({
  records,
  renderItem,
}: GridListProps<T>) => {
  const renderList = records.length
    ? records.map((record) => (
        <Col
          xs={6}
          md={3}
          className="d-flex justify-content-center mb-5 mt-2"
          key={record.id}
        >
          {renderItem(record)}
        </Col>
      ))
    : "there is no category";
  return <Row>{renderList}</Row>;
};

export default GridList;
