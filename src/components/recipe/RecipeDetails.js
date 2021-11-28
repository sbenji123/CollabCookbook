import React from 'react'
import { useParams } from 'react-router';

const RecipeDetails = (props) => {
    const { id } = useParams();
    return (
        <div className="div container section recipe-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Recipe Name - {id} </span>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur cupiditate, facere dolorum, asperiores tempora consequuntur ducimus dolore saepe accusantium provident non. Magni veritatis deserunt cumque. Quibusdam praesentium sunt explicabo dolorem.</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Author: Samuel Benjamin</div>
                    <div>Date: November 27th, 2021</div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails
