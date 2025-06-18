import React, { useState } from 'react'
import "./toast.css"
import type { ToastProps } from './Toast'
import Toast from './Toast'


const ToastContainer = () => {
  const toasts: ToastProps[] = [
      { toastId: 1, message: 'Hey', type: 'success', duration: 3000, position: 'top-left', animation: 'fade' },
      { toastId: 2, message: 'Hello World!', type: 'error', duration: 5000, position: 'top-left', animation: 'fade' },
      { toastId: 3, message: 'Hello World!', type: 'info', duration: 7000, position: 'top-left', animation: 'fade' },
      { toastId: 4, message: 'Hello World!', type: 'success', duration: 8000, position: 'top-left', animation: 'fade' },
      { toastId: 5, message: 'Hello World!', type: 'info', duration: 9000, position: 'top-left', animation: 'fade' },
    ];
    const [allToasts, setAllToasts] = useState(toasts)
  
    const closeToast = (toastId: number) => {
      setAllToasts(allToasts.filter((toast :ToastProps) => toast.toastId !== toastId))
    }


  return (
    <div className='toast-container'>
        {toasts.map((toast,index) => (
            <Toast key={index} {...toast} onToastClose={() => closeToast(toast.toastId)}/>
        ))}
    </div>
  )
}

export default ToastContainer
