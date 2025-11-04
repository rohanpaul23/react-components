import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import ToastContainer from './components/Toast'
import type { ToastProps } from './components/Toast/Toast'
import Button from './components/Button';
import Modal from './components/Modal';
import Select from './components/Select';
import InfiniteScrolling from './components/InfiniteSrolling';
import InfinitePostsWithIO from './components/InfiniteSrolling/InfiniteScrollingInterSectionObserver';

const App: React.FC = () => {
  const [isOpen,setIsOpen] = useState(true)

  const [selectedValue,setSelectedValue] = useState('')

  const options = [
    {
      "id" : 1,
      "name" : "Rohan",
    },
    {
      "id" : 2,
      "name" : "Paul",
    },
    {
      "id" : 1,
      "name" : "Sonu",
    }
  ]
  // Call the components here to render

  const handleSelection = (val:any) => {
    setSelectedValue(val)
  }
  return (
    <div>
      {/* <InfiniteScrolling/> */}
      <InfinitePostsWithIO/>
    </div>
  );
};

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
