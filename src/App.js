import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Recipies from './components/Recipes';

const API_KEY = '1d3022f2e78a851da08e9ea7189cec59';

class App extends Component {
  state = {
    recipes: []
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault('');
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`);
    console.log(recipeName);
    const data = await api_call.json();
    this.setState({ recipes: data.recipes });
  }

  componentDidMount = () => {
    const json = localStorage.getItem('recipes');
    const recipes = JSON.parse(json);
    this.setState({ recipes: recipes });
  }

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipies recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;