import { createContext, type Dispatch, type SetStateAction } from "react";

export interface Socials {
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

// Define the shape of everything you are passing into 'value'
interface AppContextType {
  socialLinks: Socials;
  setSocialLinks: Dispatch<SetStateAction<Socials>>;
}

// Tell TypeScript the context starts as null but will hold AppContextType
export const AppContext = createContext<AppContextType | undefined>(undefined);
