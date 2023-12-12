import { doc, getDoc, getDocs, query, where, collection, documentId } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { db } from "../firebaseconfig";
import Recipe from "../components/Recipe";

import componentStyles from './../styles/RecipeScreen.module.scss';

export const recipeLoader = async ({ params }) => {
  // get recipe with references
  const recipeRef = doc(db, `recipes`, params.recipeId);
  const recipeSnapshot = await getDoc(recipeRef);
  const recipe = recipeSnapshot.data();

  // get author
  const authorRef = doc(db, `users`, recipe.author);
  const authorSnapshot = await getDoc(authorRef);
  const author = authorSnapshot.data();
  recipe.author = {...author, uid: recipe.author};

  // get recipe ingredients from reference
  const ingredientIds = [];
  recipe.ingredients.forEach((ingredient) => {
    if (ingredient)
      ingredientIds.push(ingredient.path.substring(ingredient.path.indexOf('/') + 1));
  });
  const ingredientsRef = collection(db, 'ingredients');
  const queryRef = query(ingredientsRef, where(documentId(), 'in', ingredientIds));
  const ingredientsSnapshot = await getDocs(queryRef);
  const ingredientTemps = []
  ingredientsSnapshot.forEach((ingredient) => {
    ingredientTemps.push({...ingredient.data(), id: ingredient.id});
  })
  recipe.ingredients = ingredientTemps;
  return {...recipe, id: recipeSnapshot.id};
}

const RecipeScreen = () => {
  const recipe = useLoaderData();

  return (
    <>
      <div className={componentStyles.screenContainer}>
        <Recipe recipe={recipe}/>
      </div>
    </>
  )
}

export default RecipeScreen;