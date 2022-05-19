import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createRecipe } from'../../store/actions/recipeActions'
import { Link, Navigate} from 'react-router-dom'

class CreateRecipe extends Component {
    state = {
        recipeTitle:'',
        prepTime:'',
        totalTime:'',
        servingSize:'',
        ingredients:'',
        directions:'',
        image:'',
        recipeCategory: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        // e.preventDefault(); //prevents default refresh of page
        this.props.createRecipe(this.state)  
    }
    render() {
      const { auth } = this.props;
      if (!auth.uid) return <Navigate to = '/signin' />
      return (
          <div className = "container">
              <form onSubmit={this.handleSubmit} className="white">
                  <h5 className="grey-text text-darken-3">Create Recipe</h5>
                  <div className="input-field">
                      <label htmlFor="recipeTitle">Recipe Title</label>
                      <input type="text" id="recipeTitle" onChange={this.handleChange} defaultValue={this.state.recipeTitle}/>
                  </div>
                  <div className="input-field">
                    <label class="active" htmlFor="recipeCategory">Recipe Category</label>
                    <select id="recipeCategory" name="recipeCategory" className="browser-default" onChange={this.handleChange}>
                      <option value="" disabled selected>Choose a Category</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Soup">Soup</option>
                      <option value="Salad">Salad</option>
                      <option value="Main">Main</option>
                      <option value="Baked Good">Baked Good</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Side">Side</option>
                      <option value="Snack">Snack</option>
                    </select>
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
                      <Link to={'/recipe/list'}>
                          <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Create</button>
                      </Link>
                  </div>
              </form>
          </div>        
          )}
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (recipe) => dispatch(createRecipe(recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe)
