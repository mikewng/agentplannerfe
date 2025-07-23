import React, { createContext, useState, ReactNode, useContext } from "react";

export type Page = "main" | "login" | "prompt";

interface NavigationContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>("main");

  const navigate = (page: Page) => setCurrentPage(page);

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigation must be used within a NavigationProvider");
  return context;
};
