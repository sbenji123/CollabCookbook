import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createRecipe } from'../../store/actions/recipeActions'
import { Link } from 'react-router-dom'

class CreateRecipe extends Component {
    state = {
        recipeTitle:'',
        prepTime:'',
        totalTime:'',
        servingSize:'',
        ingredients:'',
        directions:'',
        image:'',
        authorFirstName: "Samuel", authorLastName: "Benjamin" // need to change when atually doing it
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        // e.preventDefault(); //prevents default refresh of page
        console.log("Submit")
        this.props.createRecipe(this.state)
    }
    render() {
        return (
            <div className = "container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create Recipe</h5>
                    <div className="input-field">
                        <label htmlFor="recipeTitle">Recipe Title</label>
                        <input type="text" id="recipeTitle" onChange={this.handleChange} defaultValue={this.state.recipeTitle}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="prepTime">Prep Time</label>
                        <input type="text" id="prepTime" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="totalTime">Total Time</label>
                        <input type="text" id="totalTime" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="servingSize">Serving Size</label>
                        <input type="text" id="servingSize" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea id="ingredients"  className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <label htmlFor="directions">Directions</label>
                        <textarea id="directions"  className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <Link to={'/recipe/'+this.state.id}>
                            <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Create</button>
                        </Link>
                    </div>
                </form>
            </div>        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (recipe) => dispatch(createRecipe(recipe))
    }
}

export default connect(null, mapDispatchToProps)(CreateRecipe)
