import { FC, Dispatch, SetStateAction } from "react";

type SignUpWelcomePanelProps = {
  setToogleForm: Dispatch<SetStateAction<boolean>>;
};

export const SignUpWelcomePanel: FC<SignUpWelcomePanelProps> = ({
  setToogleForm,
}) => {
  return (
    <div className="overlay-panel overlay-left">
      <h2 className="reg-form-title">Welcome to us!</h2>
      <p>To keep connected with us please login with your personal details</p>
      <button className="ghost" onClick={() => setToogleForm(false)}>
        Sign In
      </button>
    </div>
  );
};
