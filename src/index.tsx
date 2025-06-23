import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import ToastContainer from './components/Toast'
import type { ToastProps } from './components/Toast/Toast'
import Button from './components/Button';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [isOpen,setIsOpen] = useState(true)

  // Call the components here to render
  return (
    <div>
     {isOpen && <Modal isOpen onClose={()=>setIsOpen(false)}>Test Modal</Modal>}
    </div>
  );
};

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
