import React, { Component } from 'react'
import RecipeDetails from './RecipeDetails'
import { connect } from 'react-redux';

export class ShowRecipePage extends Component {

    render() {
        console.log('Show Recipe Page')
        const { recipe } = this.props
        return (
            <RecipeDetails recipe = {recipe} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recipe: state.recipe.recipe
    }
}

export default connect(mapStateToProps)(ShowRecipePage);
