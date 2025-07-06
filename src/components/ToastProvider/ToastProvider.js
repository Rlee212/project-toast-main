import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {

  const [toastList, setToastList] = React.useState([]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToastList([]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
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
