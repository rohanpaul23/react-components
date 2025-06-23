import React from 'react'


interface ModalHeaderProps {
   children: React.ReactNode,
   onClose:() => void
   className?: string
}

const ModalHeader = ({children,onClose}:ModalHeaderProps) => {
  return (
    <div className={`modal-header`}>
      {children}
      <button className="close-button" onClick={onClose}>
       x
      </button>
    </div>
  )
}



export default ModalHeader
