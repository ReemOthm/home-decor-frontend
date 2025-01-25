import { CategoryForm, LoginForm, ProductForm, SignupForm } from "./../types";

export const SignupFormData: SignupForm[] = [
    {
        type: 'text',
        placeholder: "Enter a Username",
        name: 'username',
    },
    {
        type: 'email',
        placeholder: "Enter an Email",
        name: 'email',
    },
    {
        type: 'password' ,
        placeholder: "Enter a password",
        name: 'password',
    },
    {
        type: 'text' ,
        placeholder: "Enter your first name",
        name: 'firstName',
    },
    {
        type: 'text' ,
        placeholder: "Enter your last name",
        name: 'lastName',
    },
    {
        type: 'number' ,
        placeholder: "Enter your phone number",
        name: 'phoneNumber',
    }
];

export const LoginFormData: LoginForm[] = [
    {
        type: 'email',
        placeholder: "Enter an Email",
        name: 'email',
    },
    {
        type: 'password',
        placeholder: "Enter a password",
        name: 'password',
    },   
]

export const CategoryData: CategoryForm[] = [
    {
        type: 'text',
        name: 'name',
    },
    {
        type: 'text',
        name: 'description',
    } 
]

export const ProductData: ProductForm[] = [
    {
        type: 'text',
        name: 'productName',
    },
    {
        type: 'text',
        name: 'description',
    },
    {
        type: 'text',
        name: 'price',
    },
    {
        type: 'text',
        name: 'category',
    },
    {
        type: 'text',
        name: 'image',
    },
    {
        type: 'text',
        name: 'colors',
    },
    
]
