import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editRecipe } from'../../store/actions/recipeActions'

class EditRecipe extends Component {
    state = { ...this.props.recipe, 
                ingrediants: this.props.recipe.ingrediants.join('\n'),
                directions: this.props.recipe.directions.join('\n')}
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault(); //prevents default refresh of page
        // console.log(this.state)
        this.props.editRecipe(this.state)
    }
    render() {
        console.log(this.props)
        return (
            <div className = "container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Edit Recipe</h5>
                    <div className="input-field">
                        <label className="active" htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} defaultValue={this.state.title}/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="prepTime">Prep Time</label>
                        <input type="text" id="prepTime" onChange={this.handleChange} defaultValue={this.state.prepTime}/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="totalTime">Total Time</label>
                        <input type="text" id="totalTime" onChange={this.handleChange} defaultValue={this.state.totalTime}/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="servingSize">Serving Size</label>
                        <input type="text" id="servingSize" onChange={this.handleChange} defaultValue={this.state.servingSize}/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="ingrediants">Ingrediants</label>
                        <textarea id="ingrediants"  className="materialize-textarea" onChange={this.handleChange} defaultValue={this.state.ingrediants}></textarea>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="directions">Directions</label>
                        <textarea id="directions" className="materialize-textarea" onChange={this.handleChange} defaultValue={this.state.directions}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Edit</button>
                    </div>
                </form>
            </div>        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        recipe: state.recipe.recipe
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editRecipe: (recipe) => dispatch(editRecipe(recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe)