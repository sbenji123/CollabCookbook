import React from 'react'
import Section from "../organizer/Section"


const IngredientList = ({order, ingredients}) => {
  console.log(order, ingredients)
  return (
      <div >
          <span>
            <h5>Ingredients</h5>
          </span>
          {(order == null) ?  // condition to take care of old way to do ingredients
            <ul>
              { ingredients.map((ingredient, index) => {
                  return(<li key={index}> {ingredient} </li>)
              })}
            </ul>
           : 
           <Section order={order} list={ingredients}></Section> 
          }
      </div>
  )
}

export default IngredientList