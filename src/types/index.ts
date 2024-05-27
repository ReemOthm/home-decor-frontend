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
  categoryID: string
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
  birthDate?: string,
  createdAt: string,
  orders: Order[]
}

export type Order = {
  orderId: string,
  status: string,
  payment: string,
  amount: number,
  products: Product[],
  userId: string,
  createdAt: string
}

export type Price = {
  maxPrice: "" | number,
  minPrice: "" | number
}

export type inputs = 
  'username' | 'email' | 'password' | 'firstName' |
  'lastName' | 'address' | 'phoneNumber' | 'birthDate';

export type EntityInputs = 'name' | "description" | "createdAt" | "slug"

export type FormInput = {
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  birthDate: Date ,
}

export type LoginInput = {
  email: string,
  password: string
}

export type SignupForm = {
  type: string,
  placeholder: string,
  name: inputs,
} 

export type LoginForm = {
  type: string,
  placeholder: string,
  name: 'email' | 'password',
} 

export type CategoryForm = {
  type: string,
  name: EntityInputs
} 
