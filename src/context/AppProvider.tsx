import React, { type ReactNode } from "react";
import { AppContext } from "./AppContext";

interface Socials {
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [socialLinks, setSocialLinks] = React.useState<Socials>({
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  return (
    <AppContext.Provider
      value={{
        socialLinks,
        setSocialLinks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
