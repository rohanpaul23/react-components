import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import ToastContainer from './components/Toast'
import type { ToastProps } from './components/Toast/Toast'
import Button from './components/Button';

const App: React.FC = () => {
  

  // Call the components here to render
  return (
    <div>
     <Button variant="danger" onClick={() => console.log('clicked')} disabled={false}>Save</Button>
    </div>
  );
};

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
