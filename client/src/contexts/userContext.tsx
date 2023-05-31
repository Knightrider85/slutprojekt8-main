import React, { createContext, useState } from 'react';

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