import Joi from "joi";

import { allowedFileTypes, maxFileSize, passwordRegExp } from "../constants";
import {
  CreateProductFormInputT,
  SignInFormInputT,
  SignUpFormInputT,
  UpdateUserFormInputT,
} from "../types";

const fileCheck = (file: File, helpers: Joi.CustomHelpers<any>) => {
  if (file) {
    if (!(file instanceof File)) {
      return helpers.error("any.invalid", {
        message: "File must be a valid image",
      });
    }

    if (!allowedFileTypes.includes(file.type)) {
      return helpers.error("any.invalid", {
        message: "File must be an image",
      });
    }

    // file size should be less than 2MB
    if (file.size > maxFileSize) {
      return helpers.error("sany.invalid", {
        message: "File must be smaller than 2MB",
      });
    }
  }

  return file;
};

export const signInValidator = async (signInData: SignInFormInputT) => {
  const signInScheme = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = signInScheme.validate(signInData);

  return { error };
};

export const signUpValidator = async (signInData: SignUpFormInputT) => {
  const signUpScheme = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().pattern(passwordRegExp).min(6).max(32).required(),
    birthDate: Joi.date().optional(),
    avatar: Joi.any()
      .optional()
      .custom(async (value, helpers) => {
        return await fileCheck(value, helpers);
      })
      .message("Invalid file"),
  });

  const { error } = signUpScheme.validate(signInData);

  return { error };
};

export const actionProductValidator = async (
  signInData: CreateProductFormInputT
) => {
  const userProductScheme = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().integer().greater(0).required(),
    discountedPrice: Joi.number().optional(),
    description: Joi.string().optional(),
    image: Joi.any()
      .optional()
      .custom((value, helpers) => {
        return fileCheck(value, helpers);
      })
      .message("Invalid file"),
  });

  const { error } = userProductScheme.validate(signInData);

  return { error };
};

export const updateUserDataValidator = async (
  signInData: UpdateUserFormInputT
) => {
  const signUpScheme = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    birthDate: Joi.date().optional(),
    avatar: Joi.any()
      .optional()
      .custom(async (value, helpers) => {
        return fileCheck(value, helpers);
      })
      .message("Invalid file"),
  });

  const { error } = signUpScheme.validate(signInData);

  return { error };
};
