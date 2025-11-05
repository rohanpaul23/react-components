import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import ToastContainer from './components/Toast'
import type { ToastProps } from './components/Toast/Toast'
import Button from './components/Button';
import Modal from './components/Modal';
import Select from './components/Select';
import InfiniteScrolling from './components/InfiniteSrolling';
import InfinitePostsWithIO from './components/InfiniteSrolling/InfiniteScrollingInterSectionObserver';
import UsersTable from './components/UsersTable';
import CinemaCopy from './components/CinemaHallLayout';
import CinemaHallLayout from './components/CinemaHallLayout';

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
      {/* <CinemaCopy rows={10} columns={16}/> */}
      <CinemaHallLayout  rows={10} columns={16}/>
    </div>
  );
};

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
