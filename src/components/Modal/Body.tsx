import React from 'react'


interface ModalBodyProps {
   children: React.ReactNode,
   className?: string
}

const ModalBody = ({children,className}:ModalBodyProps) => {
  return (
    <div className={`modal-body ${className !== undefined ? className : ""}`}>
      {children}
    </div>
  )
}



export default ModalBody
