import {
  FC,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

import { ErrorText } from "../../../common/error-text";
import { HelperText } from "../../../common/helper-text";
import { SignUpFormInputT, UserT } from "@/store-client/src/types";
import { passwordHelperText } from "@/store-client/src/constants";
import { apiPublicHandler } from "@/store-client/src/constants/api";
import { signUpValidator } from "@/store-client/src/utils/form-validator";

type SignUpFormProps = {
  setToogleForm: Dispatch<SetStateAction<boolean>>;
};

export const SignUpForm: FC<SignUpFormProps> = ({ setToogleForm }) => {
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSignUp = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError(null);
    const form = ev.target as HTMLFormElement;

    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
      .value;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const birthDate = (form.elements.namedItem("birthDate") as HTMLInputElement)
      .value;

    const fileInput = form.elements.namedItem("avatar") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    const userData: SignUpFormInputT = {
      firstName,
      lastName,
      email,
      password,
      birthDate: birthDate || undefined,
      avatar: file || null,
    };

    const { error } = await signUpValidator(userData);

    if (error) {
      setError(error.message);
      return;
    }

    sendSignUpFormData(userData);
  };

  const sendSignUpFormData = async (data: SignUpFormInputT) => {
    const formData = new FormData();

    for (const name in data) {
      const itemName = name as keyof SignUpFormInputT;
      const itemValue = data[itemName];

      if (itemValue && itemValue instanceof Blob) {
        if (itemValue.type.startsWith("image/")) {
          formData.append(itemName, itemValue);
        }
      } else if (itemValue) {
        if (typeof itemValue === "string") {
          formData.append(itemName, itemValue);
        } else {
          formData.append(itemName, JSON.stringify(itemValue));
        }
      }
    }

    const response = await apiPublicHandler<UserT>("users", {
      method: "POST",
      body: formData,
    });

    if (response.error) {
      setError(response.error);
      return;
    }

    if (response.status === 201) {
      toast.success("User created successfully 🎉");
      setToogleForm(false);
      formRef?.current?.reset();
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form ref={formRef} onSubmit={handleSignUp} encType="multipart/form-data">
        <h2 className="reg-form-title">Create Account</h2>
        <span>and become a customer of our store</span>
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="date"
          name="birthDate"
          className="form-input"
          id="birth-date"
        />
        <input
          type="file"
          id="avatar"
          name="avatar"
          className="user-avatar"
          accept="image/png, image/jpeg"
        />
        <HelperText>{passwordHelperText}</HelperText>
        {error && <ErrorText>{error}</ErrorText>}
        <div className="sign-in-btn-wrapper">
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
};
