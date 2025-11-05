import React from 'react'
import "./styles.css"

type Props = {
    rows: number,
    columns: number
}

const CinemaHallLayout = ({rows,columns}:Props) => {
  const rowLabels = "ABCDEFGHIJKLMNO"

  const renderRow = (rowLabel:string) => {
    const cells = [];
    for (let i = 1; i <= columns; i++) {
      cells.push(<div className='seat' key={rowLabel + i} onClick={() => console.log(rowLabel + i)}>{i}</div>)
    }
    return cells
  }
  return (
    <div className='hallContainer'>
    <div className='seatsSelection'>
        <div className='flex'>
            <div className='seatDistrubution available'></div>
            <label>Available</label>       
        </div>
         <div className='flex'>
            <div className='seatDistrubution selected'></div>
            <label>Selected</label>       
        </div>
        <div className='flex'>
            <div className='seatDistrubution sold'></div>
            <label>Sold</label>       
        </div>
    </div>
     <div className='seatsLayout'>
      {rowLabels.split("").map((rowLabel,index) => (
          <div className='rowContainer' key={index}>
            <div className='rowLabel'>{rowLabel}</div>
            <div className='rowSeats'>{renderRow(rowLabel)}</div>
            <div className='rowLabel'>{rowLabel}</div>
          </div>
      ))}
     </div>
     <div className='screen'></div>
     <div className='seatsDistrubtion'></div>
    </div>
  )
}

export default CinemaHallLayout
