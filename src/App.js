import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/Dashboard';
import ShowRecipePage from './components/recipe/ShowRecipePage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateRecipe from './components/recipe/CreateRecipe';
import EditRecipe from './components/recipe/EditRecipe';
import RecipeList from './components/recipe/RecipeList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipe/:id" element={<ShowRecipePage />} />
            <Route path="/recipe/:id/edit" element={<EditRecipe />} />
            <Route path="/recipe/create" element={<CreateRecipe />} />
            <Route path="/recipe/list" element={<RecipeList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
