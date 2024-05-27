import { z } from "zod";

const passwordValidation = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const signupSchema = z.object({
        username: z.string({message: "Please enter a Username"})
                .min(5, "username must be at least 5 characters"),
        email: z.string({message: "Please enter an Email"})
                .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g , 'Enter a valid email'),
        password: z.string()
                .regex(passwordValidation, 
                "Password minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
        firstName: z.string().min(1, {message: 'This field is required'}),
        lastName: z.string().optional(),
        phoneNumber: z.string().
                regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+.{9}$/, "please enter a valid phone number"),
        address: z.string().optional(),
        birthDate: z.string().optional(),
});


export const loginSchema = z.object({
        email: z.string({message: "Please enter an Email"})
                .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g , 'Enter a valid email'),
        password: z.string({message: "please enter a password"})
                .regex(passwordValidation, 
                "Password minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
});

export const categorySchema = z.object({
        name: z.string({message: "Please enter an Email"}).min(3, {message: "name must be at least 3 characters"}),
        description: z.string({message: "please enter a password"})
        .min(10, {message: "description must be at least 10 characters"})
        .max(60, {message: "description must be less than 60 characters"}),
});