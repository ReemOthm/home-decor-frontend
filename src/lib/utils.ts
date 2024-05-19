import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenFromStorage() {
  const token = localStorage.getItem("token")
  if (!token) return null

  return token
}

export function discrptionSlice(description: string, max = 50){
  if(description.length >= max)`${description.slice(0,max)}...`;
  else return description;
}
