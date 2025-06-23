import React from 'react'
import ModalHeader from './Header'
import ModalBody from './Body'
import "./modal.css"
import ModalFooter from './Footer'


interface ModalProps {
    children : React.ReactNode
    isOpen : boolean,
    onClose : () => void,
    className?: string
}

const Modal = ({children,isOpen, onClose} :  ModalProps) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <ModalHeader onClose={onClose}>
            <div>Header</div>
        </ModalHeader>
        <ModalBody>Modal Body Content</ModalBody>
        <ModalFooter>
            <button className='button-secondary'>Cancel</button>
            <button className='button-primary'>Save</button>
        </ModalFooter>
      </div>
    </div>
  )
}


export default Modal
