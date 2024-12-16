import { FC, Dispatch, SetStateAction } from "react";

type SignInWelcomePanelProps = {
  setToogleForm: Dispatch<SetStateAction<boolean>>;
};

export const SignInWelcomePanel: FC<SignInWelcomePanelProps> = ({
  setToogleForm,
}) => {
  return (
    <div className="overlay-panel overlay-right">
      <h2 className="reg-form-title">Hello !</h2>
      <p>Enter your personal details and start cooperate with us</p>
      <button className="ghost" onClick={() => setToogleForm(true)}>
        Sign Up
      </button>
    </div>
  );
};
