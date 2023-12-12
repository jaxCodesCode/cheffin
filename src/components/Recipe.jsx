import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from 'firebase/storage';
import { auth, db, store } from '../firebaseconfig';
import { deleteDoc, doc } from "firebase/firestore";
import RippleButton from "./RippleButton";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PropTypes from 'prop-types'

import componentStyles from './../styles/Recipe.module.scss'

const Recipe = ({ recipe }) => {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    getDownloadURL(ref(store, recipe.image))
      .then((url) => {
        setImageUrl(url);
      });
  }, []);

  const deleteRecipe = async () => {
    await deleteIngredients();
    await deleteDoc(doc(db, 'recipes', recipe.id));
    navigate('/recipes')
  }

  const deleteIngredients = async () => {
    for (let ingredient of recipe.ingredients) {
      await deleteDoc(doc(db, "ingredients", ingredient.id));
    }
  }

  return (
    <>
      <div className={componentStyles.recipeContainer}>
        <div className={componentStyles.recipeHeaderContainer} style={{backgroundImage: `url(${imageUrl})`}}>
          <div className={componentStyles.formContentContainer}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={[
                    componentStyles.recipeHeaderTextContainer, 
                    componentStyles.recipeTitleContainer].join(' ')}>
                  <span>
                    {recipe.name}
                  </span>
                </div>
                { auth.currentUser.uid === recipe.author.uid &&
                  (
                    <div style={{ display: 'flex', height: 'min-content' }}> 
                      <RippleButton RippleButton sx={{ padding: '0.125rem', marginRight: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.35)', border: '2px solid white' }}>
                        <EditOutlinedIcon fontSize="large" sx={{ color: 'white' }}/>
                      </RippleButton>
                      <RippleButton onClick={() => deleteRecipe()} color="error" sx={{ padding: '0.125rem', backgroundColor: 'rgba(215, 95, 95, 0.35)', border: '2px solid #c23737' }}>
                        <DeleteForeverOutlinedIcon fontSize="large" sx={{ color: '#c23737' }}/>
                      </RippleButton>
                    </div>
                  )
                }
              </div>
              <div className={[
                  componentStyles.recipeHeaderTextContainer].join(' ')}>
                <span>
                  By {recipe.author.displayName}
                </span>
              </div>
              <div className={componentStyles.recipeHeaderTextContainer}>
                <span>
                  Serves {recipe.serves}
                </span>
              </div>
              <div className={[
                  componentStyles.recipeHeaderTextContainer, 
                  componentStyles.recipeDescriptionContainer].join(' ')}>
                <span>
                  {recipe.description}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={componentStyles.recipeContentContainer}>
          <div className={componentStyles.recipeDetailColumn}>
            Ingredients
            <div className={componentStyles.padHalfLeft}>
              { recipe.ingredients.map((ingredient) => {
                return (
                  <div key={ingredient.name} className={componentStyles.ingredientContainer}>
                      <span>
                        { ingredient.name } - { ingredient.quantity }&nbsp;{ ingredient.metric === '-' ? '' : ingredient.metric }
                      </span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={[componentStyles.recipeDetailColumn, componentStyles.stepColumn].join(' ')}>
            Steps
            <div className={componentStyles.padHalfLeft}>
              <ol style={{marginTop: 0}}>
                { recipe.steps.map((step) => {
                  return (
                    <li key={step} style={{ fontSize: '1.2rem' }}>
                        <div className={componentStyles.stepContainer}>
                          <span>
                            {step}
                          </span>
                        </div>  
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Recipe.propTypes = {
  recipe: PropTypes.object
}

export default Recipe;