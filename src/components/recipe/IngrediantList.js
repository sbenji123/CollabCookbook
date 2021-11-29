import React from 'react'

const IngrediantList = ({ingrediants}) => {
    console.log(ingrediants)
    return (
        <div className="card-content">
            <span className="card-title">Ingrediants</span>       
            <ul>
                { ingrediants.map((ingrediant, index) => {
                    return(<li key={index}>{ingrediant}</li>)
                })}
            </ul>
        </div>
    )
}

export default IngrediantList