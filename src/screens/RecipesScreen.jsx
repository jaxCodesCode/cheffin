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
        <Container sx={{padding: '1rem' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {recipes.map((recipe) => (
              <Grid item xs={2} sm={4} md={4} key={recipe.id}>
                <RecipePreview key={recipe.id} recipe={recipe}></RecipePreview>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default RecipesScreen;