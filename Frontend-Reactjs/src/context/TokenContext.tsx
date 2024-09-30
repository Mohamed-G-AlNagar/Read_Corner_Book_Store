
import { createContext, useState, ReactNode } from 'react';

interface TokenContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const tokenContext = createContext<TokenContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export default function TokenContextProvider({ children }: ProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}
