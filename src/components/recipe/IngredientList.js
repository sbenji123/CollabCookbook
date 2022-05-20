import React from 'react'

const IngredientList = ({ingredients}) => {
  const liStyle = {
    fontSize: "1rem",
    marginLeft: "2rem",
    listStyleType: "circle",
  }
    return (
        <div >
            <span>
              <h5>Ingredients</h5>
            </span>       
            <ul>
                { ingredients.map((ingredient, index) => {
                    return(<li style={liStyle} key={index}> {ingredient} </li>)
                })}
            </ul>
        </div>
    )
}

export default IngredientList