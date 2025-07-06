import React from 'react';
import useKeydown from '../../hooks/useKeydown';


export const ToastContext = React.createContext();

function ToastProvider({ children }) {

  const [toastList, setToastList] = React.useState([]);

  const handleEscape = React.useCallback(() => {
    setToastList([]);
  }, []);

  useKeydown('Escape', handleEscape);
  
  function dismissToast(id) {
    const newList = toastList.filter((toast) => {
      return toast.id !== id;
    });

    setToastList(newList);
  }

  const generateRandomId = (length = 6) => {
    return Math.random().toString(36).substring(2, length + 2);
  };

  function createToast(id, message, variant) {
    const nextToasts = [
      ...toastList,
      {
        id,
        message,
        variant,
      },
    ];

    setToastList(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{ toastList, createToast, dismissToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
