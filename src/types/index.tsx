import { ReactNode } from "react";

export interface IHeaderProps {
  name?: string;
  isLogged?: boolean;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  isAdm?: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IChildren {
  children: ReactNode;
}
