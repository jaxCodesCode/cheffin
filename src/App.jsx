import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { recipeLoader } from './screens/RecipeScreen';
import AppContainer from './components/AppContainer';
import RecipesScreen from './screens/RecipesScreen';
import RecipeScreen from './screens/RecipeScreen';
import NewRecipeScreen from './screens/NewRecipeScreen';

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
    <RouterProvider router={router}/>
  );
}

export default App
