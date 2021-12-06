import React from 'react'

const IngredientList = ({ingredients}) => {
    return (
        <div >
            <span >Ingredients</span>       
            <ul>
                { ingredients.map((ingredient, index) => {
                    return(<li key={index}>{ingredient}</li>)
                })}
            </ul>
        </div>
    )
}

export default IngredientList