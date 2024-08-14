import { Heading } from "@components/shared";
import { Button, Col, Form, Row, Spinner, Alert } from "react-bootstrap";
import Input from "@components/forms/input/Input";
import useLogin from "@hooks/use-Login";

const Login = () => {
  const {
    loading,
    error,
    serchParams,
    register,
    handleSubmit,
    fromError,
    emailStatus,
    onSubmit,
  } = useLogin();
  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {serchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              label="Email"
              name="email"
              error={fromError.email?.message}
            />
            <Input
              register={register}
              label="Password"
              name="password"
              error={fromError.password?.message}
              type="password"
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailStatus === "checking"
                  ? true
                  : false || loading === "pending"
              }
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
