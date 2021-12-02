import React, { Component } from 'react'
import { connect } from 'react-redux'
import { navToRecipe, removeRecipe } from'../../store/actions/recipeActions'
import { Link } from 'react-router-dom'

class RecipeRow extends Component {
    state = { ...this.props.targetRecipe}

    handleNav = (e) => {
        this.props.navToRecipe(this.state)
    }

    removeRecipe = (e) => {
        // need a way so it doesnt flash but still deletes off page
        this.props.removeRecipe(this.state)
    }

    render() {
        return (
            <tr className="row grey-text text-darken-3" >
                <td>
                    <Link to={"/recipe/"+this.state.id} onClick={this.handleNav}>
                        
                            <span className="">{this.state.title}</span>
                    </Link>
                </td>
                <td>
                    {this.state.author}
                    {/* Can put a link to all public recipes created by the author */}
                </td>
                <td>
                    <button className="btn pink lighten-3 z-depth-1" onClick={this.removeRecipe}>Remove</button>
                </td>
        </tr>
    )}
}

const mapDispatchToProps = (dispatch) => {
    return {
        navToRecipe: (recipe) => dispatch(navToRecipe(recipe)),
        removeRecipe: (recipe) => dispatch(removeRecipe(recipe))
    }
}


export default connect(null, mapDispatchToProps)(RecipeRow)