import { AxiosRequestConfig } from "axios";

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type ApiQuery = {
  queryKey: string[],
  method: HttpMethod,
  url: string,
  config?: AxiosRequestConfig
}

export type Product = {
  id: string
  name: string,
  description: string,
  image: string,
  slug: string,
  categories: Category[],
  color: string[],
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


