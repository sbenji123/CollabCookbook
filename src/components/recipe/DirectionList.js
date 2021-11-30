import React from 'react'

const DirectionList = ({directions}) => {
    return (
        <div>
            <span>Directions</span>       
            <ol>
                { directions.map((direction, index) => {
                    return(<li key={index}>{direction}</li>)
                })}
            </ol>
        </div>
    )
}

export default DirectionList