import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const isPhantomInstalled = () => window.phantom?.solana?.isPhantom;

export const getProvider = () => {
  if (isPhantomInstalled()) {
    return window.phantom?.solana;
  }
}