import React from 'react'
import "./toast.css"
import type { ToastProps } from './Toast'
import Toast from './Toast'

interface ToastContainerProps  {
    toasts : ToastProps[],
    onToastClose : (toastId : number) => void
}

const ToastContainer = ({toasts,onToastClose}: ToastContainerProps) => {
  return (
    <div className='toast-container'>
        {toasts.map((toast,index) => (
            <Toast key={index} {...toast} onToastClose={() => onToastClose(toast.toastId)}/>
        ))}
    </div>
  )
}

export default ToastContainer
