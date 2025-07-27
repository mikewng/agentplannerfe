import React, { createContext, useState, ReactNode, useContext } from "react";

export type Page = "main" | "login" | "prompt";

interface LLMContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const LLMContext = createContext<LLMContextType | undefined>(
  undefined
);

export const LLMProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>("main");

  const navigate = (page: Page) => setCurrentPage(page);

  return (
    <LLMContext.Provider value={{ currentPage, navigate }}>
      {children}
    </LLMContext.Provider>
  );
};

export const useLLM = () => {
  const context = useContext(LLMContext);
  if (!context) throw new Error("useLLM must be used within a LLMProvider");
  return context;
};
