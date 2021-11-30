import React from 'react'

const IngrediantList = ({ingrediants}) => {
    return (
        <div >
            <span >Ingrediants</span>       
            <ul>
                { ingrediants.map((ingrediant, index) => {
                    return(<li key={index}>{ingrediant}</li>)
                })}
            </ul>
        </div>
    )
}

export default IngrediantList