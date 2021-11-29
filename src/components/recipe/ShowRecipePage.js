import React, { Component } from 'react'
import RecipeDetails from './RecipeDetails'
import { connect } from 'react-redux';

export class ShowRecipePage extends Component {

    render() {
        const { recipe } = this.props
        return (
            <RecipeDetails recipe = {recipe} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recipe: state.recipes.recipes[0]
    }
}

export default connect(mapStateToProps)(ShowRecipePage);
