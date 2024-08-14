import { Header, Footer } from "@components/shared";

import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";

const { container, wrapper } = styles;

const RootLayout = () => {
  return (
    <Container className={container}>
      <Header />
      <div className={wrapper}>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default RootLayout;
