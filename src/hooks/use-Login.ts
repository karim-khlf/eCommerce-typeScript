import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUi } from "@store/auth/authslice";
import useChecklEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email().min(1, { message: "email is required" }),
  password: z
    .string()
    .min(8, { message: "passwords are at least 8 characters" }),
});
type TLoginForm = z.infer<typeof loginFormSchema>;
const useLogin = () => {
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [serchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors: fromError },
  } = useForm<TLoginForm>({
    mode: "onBlur",
    resolver: zodResolver(loginFormSchema),
  });
  const { emailStatus } = useChecklEmailAvailability();

  const onSubmit: SubmitHandler<TLoginForm> = (data) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate(`/?accessToken=${accessToken}`));
  };
  useEffect(() => {
    return () => {
      dispatch(resetUi());
    };
  }, [dispatch]);
  return {
    loading,
    error,
    serchParams,
    setSearchParams,
    register,
    handleSubmit,
    fromError,
    emailStatus,
    onSubmit,
  };
};
export default useLogin;
