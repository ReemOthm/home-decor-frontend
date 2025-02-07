export type Product = {
  productID: string
  productName: string,
  description: string,
  image: string,
  slug: string,
  category: Category ,
  categoryName: string,
  colors: string[],
  color: string,
  price: number,
  quantity: number,
  createdAt: string
}

export type ProductState = {
  products: Product[]
  totalPages: number,
  error: null | string
  isLoading: boolean
}

export type productParams ={
  category: string, 
  searchKeyword: string,
  minPrice: string, 
  maxPrice: string, 
  pageNumber: string
}

export type Category = {
  categoryID: string
  name: string,
  description: string,
  slug: string,
  products: Product[],
  createdAt: string
}

export type CategoryState = {
  categories: Category[]
  totalPages: number,
  error: null | string
  isLoading: boolean
}

export type User = {
  userID: string
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName?: string,
  phoneNumber: number,
  address?: string,
  birthDate?: string,
  isAdmin: boolean,
  isBanned: boolean,
  createdAt: string,
  orders: Order[]
}

export interface UserState {
  error: string | null;
  isLoading: boolean;
  token: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean,
  userData: User | null;
  users: User[];
  totalPages: number;
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

export type OrderState = {
  orders: Order[];
  error: string | null;
  isLoading: boolean;
  totalPages: number
}

export type Price = {
  maxPrice: "" | number,
  minPrice: "" | number
}

export type inputs = 
  'username' | 'email' | 'password' | 'firstName' |
  'lastName' | 'address' | 'phoneNumber' | 'birthDate';

export type EntityInputs = 'name' | "description" | "createdAt" | "slug"
export type ProductInputs = 'productName' | "description" | "createdAt" | "slug"| 'price' | "image" | "colors" | "category"

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

export type ProductForm = {
  type: string,
  name: ProductInputs
} 

export type CartItem = {
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

export type CartState = {
  cartProducts: CartItem[];
  totalPrice: number;
}