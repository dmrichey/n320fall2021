import "./../App.css";
import React from "react";

export default class RecipeSearch extends React.Component {
  state = {
    recipes: [
      "Apple Pie",
      "Cherry Pie",
      "Pizza Pie",
      "Hamburger",
      "Ham Steak",
      "Chocolate Mousse",
      "Chocolate Ice Cream",
    ],
    searchTerm: "",
  };

  render() {
    // Pull Out Matching Recipes for Search Term
    let matchedRecipes = this.state.recipes.filter((recipe) => {
      return recipe
        .toLocaleUpperCase()
        .includes(this.state.searchTerm.toLocaleUpperCase());
    });

    // Create List of Items in "recipes" Array
    let recipesList = matchedRecipes.map((recipe) => {
      return <li>{recipe}</li>;
    });

    return (
      <div className="recipes">
        <h2>Recipes</h2>
        <input
          value={this.state.searchTerm}
          onChange={(event) => {
            this.updateSearch(event);
          }}
        />
        <ul>{recipesList}</ul>
      </div>
    );
  }

  updateSearch(event) {
    this.setState({ searchTerm: event.target.value });
  }
}
