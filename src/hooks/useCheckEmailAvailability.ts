import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailability = () => {
  const [emailStatus, setEmailStatus] = useState<TStatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);
  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    setEmailStatus("checking");
    try {
      const req = await axios.get(`http://localhost:5000/users?email=${email}`);
      console.log(req);
      if (req.data.length > 0) {
        setEmailStatus("notAvailable");
      } else {
        setEmailStatus("available");
      }
    } catch (error) {
      setEmailStatus("failed");
    }
  };
  const resetValues = () => {
    setEnteredEmail(null);
    setEmailStatus("idle");
    console.log("i work");
  };
  return { emailStatus, enteredEmail, checkEmailAvailability, resetValues };
};
export default useCheckEmailAvailability;
