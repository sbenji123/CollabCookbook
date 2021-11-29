import React from 'react';

const RecipeSummary = ({recipe}) => {
    console.log(recipe.image)
    return (
        <div className="card z-depth-0 recipe-summary">
            <div className="card-image">
                <img src={recipe.image} alt="" />
            </div>
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{recipe.title}</span>
                <p>Author: {recipe.author}</p>
            </div>
        </div>
    )
}


export default RecipeSummary;  