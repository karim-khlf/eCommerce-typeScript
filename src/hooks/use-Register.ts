import { actAuthRegister, resetUi } from "@store/auth/authslice";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpSchema, signUpType } from "@validations/signUpValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import useCheckEmailAvailability from "./useCheckEmailAvailability";
import { useEffect } from "react";
const useRegister = () => {
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
    getFieldState,
    trigger,
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<signUpType> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => navigate("/login?message=account_created"));
  };
  const { emailStatus, checkEmailAvailability, enteredEmail, resetValues } =
    useCheckEmailAvailability();

  const onBlurEmailHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      checkEmailAvailability(value);
    } else if (isDirty && invalid && enteredEmail) {
      resetValues();
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetUi());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    register,
    handleSubmit,
    formError,
    onSubmit,
    emailStatus,
    onBlurEmailHandler,
    accessToken,
  };
};
export default useRegister;
