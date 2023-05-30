import React, { createContext, useState } from 'react';
import { CartButton } from '../components/CartButton';
import { LoginButton } from '../components/LoginButton';
import LoginForm from '../components/LoginForm';
import { Navbar } from '../components/Navbar';

export const IsSignedInContext = createContext<{
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

export function IsSignedInProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <IsSignedInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </IsSignedInContext.Provider>
  );
}

export function userContext() {
  return (
    <IsSignedInProvider>
      <LoginForm />
      <LoginButton />
      <CartButton />
      <Navbar />
    </IsSignedInProvider>
  );
}
