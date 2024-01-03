import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { recipeLoader } from './screens/RecipeScreen';
import AppContainer from './components/AppContainer';
import RecipesScreen from './screens/RecipesScreen';
import RecipeScreen from './screens/RecipeScreen';
import NewRecipeScreen from './screens/NewRecipeScreen';
import { Container } from '@mui/material';

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppContainer />,
      children: [
        {
          path: 'recipes',
          element: <RecipesScreen />
        },
        {
          path: 'recipe/:recipeId',
          element: <RecipeScreen />,
          loader: recipeLoader
        },
        {
          path: 'new-recipe',
          element: <NewRecipeScreen />
        }
      ]
    }
  ])

  return (
    <Container disableGutters>
      <RouterProvider router={router}/>
    </Container>
  );
}

export default App
