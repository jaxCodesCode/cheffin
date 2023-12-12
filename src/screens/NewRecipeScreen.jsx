import NewRecipeForm from "../components/NewRecipeForm";
import componentStyles from './../styles/NewRecipe.module.scss';

const NewRecipeScreen = () => {
  return (
    <div className={componentStyles.screenContainer}>
      <NewRecipeForm />
    </div>
  )
}

export default NewRecipeScreen;