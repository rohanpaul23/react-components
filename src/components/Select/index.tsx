import React, { useState } from 'react'
import "./styles.css"
import { FaCaretDown, FaCaretSquareDown } from "react-icons/fa";
import { MdClear } from "react-icons/md";

export interface SelectProps {
    label : string,  
    selectedValue: string,
    onChange : (valueToUpdate : string) => void
    options: any[],
}

const Select = ({label,selectedValue,onChange,options}: SelectProps) => {
  const [showOptions,setShowOptions] = useState(false)

  const handleSelection = (optionSelected : string) => {
    setShowOptions(false)
    onChange(optionSelected)
  }

  const handleSelectionOrClear = () => {
    if(selectedValue === ""){
      setShowOptions((prevShowOptions:boolean) => !prevShowOptions)
    }
    else {
     onChange("")
    }
  }

  return (
  <>
    {label !=="" && <div>{label}</div> }
     <div className="input-container" onClick={()=> handleSelectionOrClear()}>
      <input
        type={"text"}
        value={selectedValue}
        placeholder={"Select..."}
        className="input-box"
      />
      { selectedValue === "" ?
      <span className="input-icon-right">
        <FaCaretDown className={`${showOptions ? "" : "rotate180Deg"}`} />
      </span> : <span className="input-icon-right">
        <MdClear/>
      </span> }
    </div>
    {showOptions && <div className='all-options'>{
            options.map((option) => <div className='option' onClick={()=>handleSelection(option.name)} key={option.id}>{option.name}</div>)}</div>}
  </>
  )
}

export default Select
