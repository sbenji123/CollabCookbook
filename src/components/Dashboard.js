import React, { Component } from 'react';
import RecipeList from './recipe/RecipeList'
import CookbookList from './cookbook/CookbookList'

class Dashboard extends Component {
    render(){
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        {/* Cookbook List */}
                        <CookbookList />
                    </div>
                    <div className="col s12 m6">
                        {/* Recipe List */}
                        <RecipeList />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;