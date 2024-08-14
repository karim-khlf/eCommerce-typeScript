import { Container } from "react-bootstrap";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import LottieHandler from "@components/feedback/Lottie/LottieHandler";
const ErrorPage = () => {
  const error = useRouteError();

  let errorStatusText: string;
  if (isRouteErrorResponse(error)) {
    errorStatusText = error.statusText;
  } else {
    errorStatusText = "page not found";
  }

  return (
    <Container className="notFound">
      <div className="d-flex justify-content-center flex-column align-items-center margin-auto gap-0">
        <LottieHandler
          message={errorStatusText}
          type="notFound"
          styles={{ width: "500px", height: "500px" }}
        />
        <Link to="/" replace={true}>
          How about going back to safety?
        </Link>
      </div>
    </Container>
  );
};

export default ErrorPage;
