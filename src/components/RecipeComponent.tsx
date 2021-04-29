import { Recipe } from "../interfaces/Recipe";



const RecipeComponent = (props: {recipe: Recipe} ) => {
    
    const {recipe} = props;

    return (
        <div className={"recipe"}>
<div className="title">
    <img  src={recipe.thumbnail || 'http://localhost:3001/food.png'} alt={recipe.title} />

    <p>{recipe.title}</p>

    {recipe.ingredients && 
    
    <ul style={{listStyleType:'none'}}>
       {recipe.ingredients.split(',').map((item)=><li >{item}</li>)}
    </ul>
    }

    <a href={recipe.href} target={'_blank'}>
View Recipe
        </a>
</div>
        </div>
    )

}

export default RecipeComponent;