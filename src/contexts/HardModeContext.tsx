"use client";
import React, { createContext, useContext, useState } from "react";

const HardModeContext = createContext({
  isHardMode: false,
  toggleHardMode: () => {},
});

export const useHardMode = () => useContext(HardModeContext);

export const HardModeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isHardMode, setIsHardMode] = useState(false);

  const toggleHardMode = () => {
    setIsHardMode((prevMode) => !prevMode);
  };

  return (
    <HardModeContext.Provider value={{ isHardMode, toggleHardMode }}>
      {children}
    </HardModeContext.Provider>
  );
};
