import React, { createContext, useContext, useState } from 'react';

interface SnackbarContextProps {
  visible: boolean;
  message: string;
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
);

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (message: string) => {
    setMessage(message);
    setVisible(true);
  };

  const hideSnackbar = () => {
    setVisible(false);
    setMessage('');
  };

  return (
    <SnackbarContext.Provider
      value={{ visible, message, showSnackbar, hideSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
