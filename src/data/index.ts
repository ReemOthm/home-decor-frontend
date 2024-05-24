import { LoginForm, SignupForm } from "./../types";

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
    },
    {
        type: 'text' ,
        placeholder: "Enter your address",
        name: 'address',
    },
    {
        type: 'date' ,
        placeholder: "Enter your birth date",
        name: 'birthDate',
    },
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
