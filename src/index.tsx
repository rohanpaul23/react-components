import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import ToastContainer from './components/Toast'
import type { ToastProps } from './components/Toast/Toast'

const App: React.FC = () => {
  

  // Call the components here to render
  return (
    <div>
      Hello World
    </div>
  );
};

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
