import { ReactNode } from "react";

export type DashboardRouteT = {
  key: number;
  name: string;
  path: string;
  icon: ReactNode;
};

export type productDetailNameT = {
  key: string;
  name: string;
};

export type SignInFormInputT = {
  email: string;
  password: string;
};

export type UserT = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string | null;
  birthDate?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TokenT = {
  accessToken?: string;
};

export type SignUpFormInputT = { avatar: File | null } & Omit<
  UserT,
  "id" | "createdAt" | "updatedAt" | "avatar"
>;

export type UpdateUserFormInputT = {
  firstName: string;
  lastName: string;
  avatar?: File | undefined;
  birthDate?: string | Date;
};

export type ProductT = {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number | null;
  description?: string | null;
  imageUrl?: string | null;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductsDataT = {
  total: number;
  products: ProductT[];
};

export type CreateProductFormInputT = { image: File | null } & Omit<
  ProductT,
  "id" | "imageUrl" | "creatorId" | "createdAt" | "updatedAt"
>;

export type DecodedToken = {
  exp: number;
  iat: number;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type AccessTokenT = {
  accessToken: string;
};
