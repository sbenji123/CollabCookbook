import React from 'react'

const Section = ({order, list}) => {
  return (
    <div>
    { order.map((key, order_index) => {
      return(
        <div key={key}>
          <span> {key} </span>
          <ul>
            {list[key].map((item, item_index) => {
              console.log(order_index+"_"+item_index)
              return(<li key={order_index+"_"+item_index}> {item} </li>)
            })}
          </ul>
        </div>
      )
    })}
    </div>
  )
}

export default Section