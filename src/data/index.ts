import { LoginForm, RegisterForm } from "./../types";

export const RegisterFormData: RegisterForm[] = [
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
        name: 'first-name',
    },
    {
        type: 'text' ,
        placeholder: "Enter your last name",
        name: 'last-name',
    },
    {
        type: 'number' ,
        placeholder: "Enter your phone number",
        name: 'phone-number',
    },
    {
        type: 'text' ,
        placeholder: "Enter your address",
        name: 'address',
    },
    {
        type: 'text' ,
        placeholder: "Enter your birth date",
        name: 'birth-date',
    },
];

export const LoginFormData: LoginForm[] = [
    {
        type: 'email',
        placeholder: "Enter an Email",
        name: 'identifier',
    },
    {
        type: 'password',
        placeholder: "Enter a password",
        name: 'password',
    },
    
]