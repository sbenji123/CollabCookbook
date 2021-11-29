import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createRecipe } from'../../store/actions/recipeActions'

class CreateRecipe extends Component {
    state = {
        title:'',
        prepTime:'',
        totalTime:'',
        servingSize:'',
        ingrediants:'',
        directions:''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault(); //prevents default refresh of page
        // console.log(this.state)
        this.props.createRecipe(this.state)
    }
    render() {
        return (
            <div className = "container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create Recipe</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="prepTime">Prep Time</label>
                        <input type="text" id="prepTime" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="totalTime">Tottal Time</label>
                        <input type="text" id="totalTime" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="servingSize">Serving Size</label>
                        <input type="text" id="servingSize" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="ingrediants">Ingrediants</label>
                        <textarea id="ingrediants"  className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <label htmlFor="directions">directions</label>
                        <textarea id="directions"  className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
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
