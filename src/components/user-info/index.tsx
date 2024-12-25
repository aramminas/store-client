import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaUserSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { Button } from "../common/button";
import apiHandler from "../../constants/api";
import { HoverText } from "../common/hover-text";
import { ErrorText } from "../common/error-text";
import { UpdateUserFormInputT } from "../../types";
import { defaultUresAvatar } from "../../constants";
import { imgUrl, setNewDate, ss } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateUserDataValidator } from "../../utils/form-validator";
import { setUserData } from "@/store-client/src/store/slices/user.slice";
import "./styles.scss";

export const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleUpdateData = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError(null);
    const form = ev.target as HTMLFormElement;

    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
      .value;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
      .value;
    const birthDate = (form.elements.namedItem("birthDate") as HTMLInputElement)
      .value;

    const fileInput = form.elements.namedItem("avatar") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    const formData = {
      firstName,
      lastName,
      birthDate: birthDate || undefined,
      avatar: file || undefined,
    };

    const { error } = await updateUserDataValidator(formData);

    if (error) {
      setError(error.message);
      return;
    }

    sendUpdateUserFormData(formData);
  };

  const sendUpdateUserFormData = async (data: UpdateUserFormInputT) => {
    const formData = new FormData();

    for (const name in data) {
      const itemName = name as keyof UpdateUserFormInputT;
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

    const response = await apiHandler(`users/${user?.id}`, {
      method: "PATCH",
      body: formData,
    });

    if (response.error) {
      setError(response.error);
      return;
    }

    toast.success("Data updated successfully");
    dispatch(setUserData(response.data));
  };

  const handleRemoveAccount = async () => {
    const response = await apiHandler(`users/${user?.id}`, {
      method: "Delete",
    });

    if (response.error) {
      setError(response.error);
      return;
    }

    toast.warning("Account Deleted successfully!");
    dispatch(setUserData(null));
    ss.remove();

    navigate("/login");
  };

  return (
    <div className="user-info-wrapper">
      <div className="user-info-image-section">
        <img
          src={user?.avatar ? imgUrl(user?.avatar) : defaultUresAvatar}
          alt="user avatar"
        />
        <HoverText>User name</HoverText>
      </div>
      <div className="user-info-details-section">
        <form ref={formRef} onSubmit={handleUpdateData}>
          <label htmlFor="first-name" className="form-input">
            First Name
          </label>
          <input
            id="first-name"
            type="text"
            name="firstName"
            className="form-input"
            placeholder="Enter your first name"
            defaultValue={user?.firstName || ""}
          />

          <label htmlFor="last-name" className="form-input">
            Last Name
          </label>
          <input
            id="last-name"
            type="text"
            name="lastName"
            className="form-input"
            placeholder="Enter your last name"
            defaultValue={user?.lastName || ""}
          />

          <label htmlFor="birth-date" className="form-input">
            Date Of Birth
          </label>
          <input
            type="date"
            id="birth-date"
            name="birthDate"
            className="form-input"
            defaultValue={setNewDate(user?.birthDate)}
          />

          <label htmlFor="avatar" className="form-input">
            Choose a profile picture:
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            className="user-avatar"
            accept="image/png, image/jpeg"
          />
          {error && <ErrorText>{error}</ErrorText>}
          <div className="action-block">
            <Button
              type="button"
              className="error"
              onClick={handleRemoveAccount}
            >
              <FaUserSlash size={20} />
              Delete account
            </Button>
            <Button type="submit">
              <FaEdit />
              Edit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
