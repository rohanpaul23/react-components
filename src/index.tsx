import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import ToastContainer from './components/Toast'
import type { ToastProps } from './components/Toast/Toast'

const App: React.FC = () => {
  const toasts: ToastProps[] = [
    { toastId: 1, message: 'Hey', type: 'success', duration: 3000, position: 'top-left', animation: 'fade' },
    { toastId: 2, message: 'Hello World!', type: 'error', duration: 5000, position: 'top-left', animation: 'fade' },
    { toastId: 3, message: 'Hello World!', type: 'info', duration: 7000, position: 'top-left', animation: 'fade' },
    { toastId: 4, message: 'Hello World!', type: 'success', duration: 8000, position: 'top-left', animation: 'fade' },
    { toastId: 5, message: 'Hello World!', type: 'info', duration: 9000, position: 'top-left', animation: 'fade' },
  ];
  const [allToasts, setAllToasts] = useState(toasts)

  const closeToast = (toastId: number) => {
    setAllToasts(allToasts.filter(toast => toast.toastId !== toastId))
  }

  return (
    <div>
      <ToastContainer toasts={allToasts} onToastClose={closeToast}/>
    </div>
  );
};

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
