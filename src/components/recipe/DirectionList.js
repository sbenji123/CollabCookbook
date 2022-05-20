import React from 'react'

const DirectionList = ({directions}) => {
  const liStyle = {
    fontSize: "1rem",
  }
    return (
        <div>
            <span>
              <h5>Directions</h5>
            </span>       
            <ol>
                { directions.map((direction, index) => {
                    return(<li style={liStyle} key={index}>{direction}</li>)
                })}
            </ol>
        </div>
    )
}

export default DirectionList