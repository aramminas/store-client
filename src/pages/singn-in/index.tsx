import { useState } from "react";

import { SignInForm } from "../../components/pages/auth/sign-in-form";
import { SignUpForm } from "../../components/pages/auth/sign-up-form";
import { SignUpWelcomePanel } from "../../components/pages/auth/sign-up-welcome-panel";
import { SignInWelcomePanel } from "../../components/pages/auth/sign-in-welcome-panel";
import "./styles.scss";

export const SignIn = () => {
  const [toggleForm, setToogleForm] = useState(false);

  return (
    <div className="registration-form-wrapper">
      <div
        id="container"
        className={`container ${toggleForm && "right-panel-active"} `}
      >
        <SignUpForm setToogleForm={setToogleForm} />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <SignUpWelcomePanel setToogleForm={setToogleForm} />
            <SignInWelcomePanel setToogleForm={setToogleForm} />
          </div>
        </div>
      </div>
    </div>
  );
};
