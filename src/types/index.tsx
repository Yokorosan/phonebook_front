import { ReactNode } from "react";

export interface IHeaderProps {
  name?: string | JSX.Element;
  isLogged?: boolean;
}

export interface IBodyProps {
  user?: IUserLogged;
  isLogged?: boolean;
  contacts?: IUserContacts[];
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  isAdm?: boolean;
}

export interface IRegisterContact {
  name: string;
  email: string;
  phone: string;
}
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserEdit {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
}

export interface IContactEdit {
  name?: string;
  email?: string;
  phone?: string;
}

export interface IChildren {
  children: ReactNode;
}
export interface IUserContacts {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserLogged {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdm: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  contacts: IUserContacts[];
}
