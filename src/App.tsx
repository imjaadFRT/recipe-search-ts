import React, { FormEvent, ReactEventHandler, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Recipe } from './interfaces/Recipe';
import RecipeComponent from './components/RecipeComponent';
 
function App() {

  const [recipesFound, setRecipeFound ] = useState <Recipe[]> ([])
  const [recipeSearch, setRecipeSearch] = useState("")

  const searchForRecipe = async (query : string): Promise<Recipe[]>  =>{
    const result = await fetch(`http://localhost:3001/?search=${query}`);
    return (await result.json()).results
  }
  var search =(event : FormEvent<HTMLFormElement>) =>{

    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const input = form.querySelector("#searchText") as HTMLInputElement

    setRecipeSearch(input.value)
  }

  useEffect(()=>{
    (async () =>{
      const query = encodeURIComponent(recipeSearch)
      if(query){
        const response = await searchForRecipe(query)
  
        setRecipeFound(response)
      }
      
    })(); 
  },[recipeSearch])




  return (
    <div className="App">
     <h2>
       Hello recipe search
     </h2>

     <form className="searchForm" onSubmit={event=> search(event)}>  
<input id="searchText" type="text" />

<button>Search</button>
     </form>


    {recipeSearch.length>0 && <p>Results for {recipeSearch}...</p>}

    <div className="recipe-container">

    {recipesFound.length>0  && recipesFound.map((item,index)=>
  
      (<RecipeComponent key={index} recipe={item}></RecipeComponent>)
    )}
    </div>




    </div>
  );
}

export default App;
