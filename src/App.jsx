import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { recipeLoader } from './screens/RecipeScreen';
import AppContainer from './components/AppContainer';
import RecipesScreen from './screens/RecipesScreen';
import RecipeScreen from './screens/RecipeScreen';
import NewRecipeScreen from './screens/NewRecipeScreen';
import { Container } from '@mui/material';
import componentStyles from './styles/App.module.scss'
import ProtectedRoute from './components/ProtectedRoute';

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
          element: <ProtectedRoute>
            <NewRecipeScreen />
          </ProtectedRoute>
        
        }
      ]
    }
  ])

  return (
    <Container disableGutters sx={{ maxHeight: '100vh'}} className={componentStyles.scrollable}>
      <RouterProvider router={router}/>
    </Container>
  );
}

export default App
