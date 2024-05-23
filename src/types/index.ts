import { AxiosRequestConfig } from "axios";

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type ApiQuery = {
  queryKey: string[],
  method: HttpMethod,
  url: string,
  config?: AxiosRequestConfig
}

export type Product = {
  productID: string
  productName: string,
  description: string,
  image: string,
  slug: string,
  category: Category,
  colors: string[],
  price: number,
  quantity: number,
  createdAt: string
}

export type Category = {
  id: string
  name: string,
  description: string,
  slug: string,
  products: Product[],
  createdAt: string
}

export type User = {
  id: string
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName?: string,
  phoneNumber: number,
  address?: string,
  createdAt: string
}

export type Price = {
  maxPrice: "" | number,
  minPrice: "" | number
}

export type inputs = 
  'username' | 'email' | 'password' | 'first-name' |
  'last-name' | 'address' | 'phone-number' | 'birth-date';

export type FormInput = {
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  birthDate: string,
}

export type LoginInput = {
  identifier: string,
  password: string
}

export type RegisterForm = {
  type: string,
  placeholder: string,
  name: inputs,
} 

export type LoginForm = {
  type: string,
  placeholder: string,
  name: 'identifier' | 'password',
} 