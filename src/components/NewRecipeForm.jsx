import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from "firebase/firestore"; 
import { db, store } from "../firebaseconfig";
import { ref, uploadBytes } from "firebase/storage";
import componentStyles from './../styles/NewRecipeForm.module.scss'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig';
import IngredientsForm from './IngredientsForm';
import StepsForm from './StepsForm';
import RecipeInfoForm from "./RecipeInfoForm";

const NewRecipeForm = () => {

  let navigate = useNavigate();

  const recipeInfoFormRef = useRef();
  const ingredientsFormRef = useRef();
  const stepsFormRef = useRef();

  const createNewRecipe =  async (e) => {
    e.preventDefault();

    const recipeInfo = recipeInfoFormRef.current.getRecipeInfo();
    const ingredients = ingredientsFormRef.current.getIngredients();
    const steps = stepsFormRef.current.getSteps();
    
    if (canAddRecipe(recipeInfo, ingredients, steps)) {
      const author = auth.currentUser.uid;
      const ingredientRefs = await createIngredients(ingredients);
      const imageRef = await uploadImage(recipeInfo.image);
      const recipe = {
        name: recipeInfo.title,
        author: author,
        serves: recipeInfo.serves,
        description: recipeInfo.description,
        ingredients: ingredientRefs,
        steps: steps,
        image: imageRef
      }
      
      await addDoc(collection(db, "recipes"), recipe);
      navigate('/recipes')
    } else {
      alert('Issue with recipe form. Ensure you\'ve included the following:\n   Title\n   Description\n   Serves\n   At least one ingredient\n   At least one step')
    } 
  }

  const canAddRecipe = (recipeInfo, ingredients, steps) => {
    return (
      recipeInfo.title &&
      recipeInfo.description &&
      recipeInfo.serves &&
      ingredients.length !== 0 &&
      steps.length !== 0
    )
  }

  const createIngredients = async (ingredients) => {
    const ingredientRefs = []
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      const docRef = await addDoc(collection(db, "ingredients"), {
        name: ingredient.ingredient,
        quantity: ingredient.quantity,
        metric: ingredient.metric
      });
      ingredientRefs.push(docRef);
    }

    return ingredientRefs;
  }

  const uploadImage = async (imageFile) => {
    const fileName = `recipe-images/${uuidv4()}`;
    const pathRef = ref(store, fileName);

    await uploadBytes(pathRef, imageFile);
    return fileName;
  }

  return (
    <form onSubmit={(e) => createNewRecipe(e)}>
      <div className={componentStyles.formsContainer}>
        <RecipeInfoForm ref={recipeInfoFormRef}/>
        <div className={componentStyles.detailFormsContainer}>
          <IngredientsForm ref={ingredientsFormRef}/>
          <StepsForm ref={stepsFormRef} />
        </div>
        <button type='submit'>Add Recipe</button>
      </div>
    </form>
  )
}

export default NewRecipeForm;