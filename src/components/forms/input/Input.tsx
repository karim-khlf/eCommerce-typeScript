import { Form } from "react-bootstrap";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";
type TInputProps<TFieldValue extends FieldValues> = {
  register: UseFormRegister<TFieldValue>;
  name: Path<TFieldValue>;
  label: string;
  error?: string;
  type?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
};
const Input = <TFieldValue extends FieldValues>({
  register,
  label,
  name,
  error,
  type = "text",
  onBlur,
  formText,
  success,
}: TInputProps<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        onBlur={onBlurHandler}
        isInvalid={!!error}
        isValid={!!success}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      {formText && <Form.Text muted={true}>{formText}</Form.Text>}
    </Form.Group>
  );
};

export default Input;
