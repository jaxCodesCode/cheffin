import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useEffect, useState } from "react";
import RecipePreview from "../components/RecipePreview";
import Grid from '@mui/material/Grid'
import { Container } from "@mui/material";

import componentStyles from './../styles/RecipesScreen.module.scss';

const RecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const recipesRef = collection(db, 'recipes');

  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipesRef);
      setRecipes(data.docs.map((recipe) => (
        {
          ...recipe.data(),
          id: recipe.id
        }
      )));
    }

    getRecipes();
  }, []);
  
  return (
    <>
      <div className={componentStyles.screenContainer}>
        <Container >
        <Grid container spacing={2}>
          { recipes.map((recipe) => (
            <Grid key={recipe.id} item xs={12} sm={6} md={4}>
              <RecipePreview recipe={recipe} />
            </Grid>
          ))}
        </Grid>
        </Container>
      </div>
    </>
  )
}

export default RecipesScreen;