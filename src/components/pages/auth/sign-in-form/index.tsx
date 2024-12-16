import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ls } from "@/store-client/src/utils";
import { ErrorText } from "../../../common/error-text";
import { HelperText } from "../../../common/helper-text";
import { useAppDispatch } from "@/store-client/src/store";
import apiHandler from "@/store-client/src/constants/api";
import { passwordHelperText } from "@/store-client/src/constants";
import { SignInFormInputT, UserT } from "@/store-client/src/types";
import { setUserData } from "@/store-client/src/store/slices/user.slice";
import { signInValidator } from "@/store-client/src/utils/form-validator";

export const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError(null);
    const form = ev.target as HTMLFormElement;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const userData = { email, password };

    const { error } = await signInValidator(userData);

    if (error) {
      setError("Login and password required!");
      return;
    }

    sendSignInFormData(userData);
  };

  const sendSignInFormData = async ({ email, password }: SignInFormInputT) => {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    const response = await apiHandler<UserT>("users/login", {
      method: "POST",
      body: formData,
    });

    if (response.error) {
      setError(response.error);
      return;
    }

    dispatch(setUserData(response.data));

    if (response.data?.id) {
      ls.set(+response.data?.id);
    }
    toast.success("You have successfully logged in. 🎉");
    navigate("/");
  };

  return (
    <div className="form-container sign-in-container">
      <form ref={formRef} onSubmit={handleSignIn}>
        <h2 className="reg-form-title">Sign in</h2>
        <span>use your personal details for sign in</span>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <HelperText>{passwordHelperText}</HelperText>
        {error && <ErrorText>{error}</ErrorText>}
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
