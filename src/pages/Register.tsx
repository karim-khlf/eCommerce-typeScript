import { Heading } from "@components/shared";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Input from "@components/forms/input/Input";

import useRegister from "@hooks/use-Register";
import { Navigate } from "react-router-dom";

const Register = () => {
  const {
    loading,
    error,
    register,
    handleSubmit,
    formError,
    onSubmit,
    emailStatus,
    onBlurEmailHandler,
    accessToken,
  } = useRegister();

  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              name="firstName"
              label="First Name"
              error={formError.firstName?.message}
            />
            <Input
              register={register}
              name="lastName"
              label="Last Name"
              error={formError.lastName?.message}
            />
            <Input
              register={register}
              name="email"
              label="Email"
              onBlur={onBlurEmailHandler}
              error={
                formError.email?.message
                  ? formError.email?.message
                  : emailStatus === "notAvailable"
                  ? "This email is already used"
                  : emailStatus === "failed"
                  ? "Server error"
                  : ""
              }
              formText={
                emailStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailStatus === "available"
                  ? "This email is available for use"
                  : ""
              }
            />
            <Input
              register={register}
              name="password"
              label="Password"
              error={formError.password?.message}
              type="password"
            />
            <Input
              register={register}
              name="confirmPassword"
              label="Confirm Password"
              error={formError.confirmPassword?.message}
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

export default Register;
