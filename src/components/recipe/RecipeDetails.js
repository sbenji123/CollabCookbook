import React from 'react'
import { useParams } from 'react-router';

const RecipeDetails = ({recipe}) => {
    console.log(recipe)
    const { id } = useParams(); // for URL after /recipe/:id
    return (
        <div className="div container section recipe-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{recipe.title} - {id}</span>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur cupiditate, facere dolorum, asperiores tempora consequuntur ducimus dolore saepe accusantium provident non. Magni veritatis deserunt cumque. Quibusdam praesentium sunt explicabo dolorem.</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Author: {recipe.author}</div>
                    <div>Date: November 27th, 2021</div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails
