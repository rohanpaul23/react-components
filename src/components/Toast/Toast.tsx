import React, { useEffect } from 'react'

import "./toast.css"

export interface ToastProps {
    toastId : number,  
    message: string,
    type: string,
    duration: number,
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    animation : "slide" | "fade"
    onToastClose?: (toastId : number) => void
}

const Toast = ({ toastId, message, type, duration, position, animation,onToastClose}: ToastProps) => {
  
  useEffect(() => {
    if (duration) {
      const timerId =  setTimeout(() => {
        onToastClose(toastId)
      }, duration);
      return () => clearTimeout(timerId);
    }
  }, [duration, onToastClose]);

  return (
    <div className={`toast ${type} ${position} ${animation}`}>
      <span>{message}</span>
      <button className='close' onClick={()=>onToastClose(toastId)} aria-label="Close toast">X</button>
    </div>
  );
};

export default Toast
