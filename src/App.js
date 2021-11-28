import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/Dashboard';
import RecipeDetails from './components/recipe/RecipeDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateRecipe from './components/recipe/CreateRecipe';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/recipe/:id' element={<RecipeDetails/>} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/create-recipe' element={<CreateRecipe />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
