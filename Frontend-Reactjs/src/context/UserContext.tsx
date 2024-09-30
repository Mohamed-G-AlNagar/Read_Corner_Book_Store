import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface User {
  id: number;
  cartId: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  role: string;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
