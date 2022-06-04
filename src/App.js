import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/Dashboard';
import ShowRecipePage from './components/recipe/ShowRecipePage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateRecipe from './components/recipe/CreateRecipe';
import ShowRecipeEditPage from './components/recipe/ShowRecipeEditPage';
import ShowRecipeList from './components/recipe/ShowRecipeList';
import ShowCookbookList from './components/cookbook/ShowCookbookList';
import CreateCookbook from './components/cookbook/CreateCookbook';
import ShowCookbookPage from './components/cookbook/ShowCookbookPage';
import ShowCookbookEditPage from './components/cookbook/ShowCookbookEditPage';
import ShowCreateRecipeInCookbook from './components/cookbook/ShowCreateRecipeInCookbook';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/recipes/:id" element={<ShowRecipePage />} />
            <Route path="/recipes/:id/edit" element={<ShowRecipeEditPage />} />
            <Route path="/recipes/create" element={<CreateRecipe />} />
            <Route path="/recipes/list" element={<ShowRecipeList />} />
            <Route path="/cookbooks/:id" element={<ShowCookbookPage />} />
            <Route path="/cookbooks/:id/recipe/create" element={<ShowCreateRecipeInCookbook />}/>
            <Route path="/cookbooks/:id/edit" element={<ShowCookbookEditPage />} />
            <Route path="/cookbooks/create" element={<CreateCookbook />} />
            <Route path="/cookbooks/list" element={<ShowCookbookList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
