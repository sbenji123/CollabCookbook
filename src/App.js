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
import 'materialize-css/dist/css/materialize.min.css';

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
