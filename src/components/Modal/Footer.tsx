import React from 'react'


interface ModalFooterProps {
   children: React.ReactNode,
   className?: string
}

const ModalFooter = ({children,className}:ModalFooterProps) => {
  return (
    <div className={`modal-footer ${className !== undefined ? className : ""}`}>
      {children}
    </div>
  )
}



export default ModalFooter
