import React from 'react';

export type MockTimer = {
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export type AppContextType = {
  mockTimer: MockTimer;
};

const defaultAppContext: AppContextType = {
  mockTimer: {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  },
};

export const AppContext = React.createContext<AppContextType>(
  defaultAppContext,
);

type ProviderProps = {
  children: React.ReactNode;
};

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({children}: ProviderProps) => {
  const [, setAppContext] = React.useState<AppContextType>(defaultAppContext);

  React.useEffect(() => {
    const currentAppContext: AppContextType = {
      mockTimer: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      },
    };
    setAppContext(currentAppContext);
  }, []);

  return (
    <AppContext.Provider value={defaultAppContext}>
      {children}
    </AppContext.Provider>
  );
};
