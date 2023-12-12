import { forwardRef, useImperativeHandle, useState } from "react";
import { IconButton } from "@mui/material";
import { RemoveCircleOutlineOutlined } from "@mui/icons-material";

import componentStyles from './../styles/IngredientsForm.module.scss';
import IngredientInput from "./IngredientInput";

const IngredientsFormI = (_, ref) => {
  const [ingredientsList, setIngredientsList] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredientsList([...ingredientsList, ingredient]);
  }

  const removeIngredient = (id) => {
    setIngredientsList(ingredientsList.filter((ingredient) => ingredient.id !== id));
  }

  const editIngredient = (id, field, value) => {
    setIngredientsList(ingredientsList.map((ingredient) => {
      if (ingredient.id === id) {
        ingredient[field] = value;
        return ingredient;
      } else {
        return ingredient;
      }
    }));
  }

  useImperativeHandle(ref, () => ({
    getIngredients() {
      return ingredientsList;
    }
  }))

  return (
    <div className={ componentStyles.formContainer }>
      Ingredients
      <div className={ componentStyles.ingredientsContainer }>
        { ingredientsList.map((ingredient, index) => {
          return (
            <div key={index} className={ componentStyles.ingredientContainer }>
              <div className={ componentStyles.inputsContainer }>
                <div className={ [componentStyles.inputContainer, componentStyles.ingredientInput].join(' ') }>
                  <input id={`ing-${index}`} 
                        onChange={(e) => editIngredient(ingredient.id, 'ingredient', e.target.value)}
                        placeholder=' ' 
                        defaultValue={ingredient.ingredient}
                        className={[componentStyles.formInput, componentStyles.opacityInput, componentStyles.ingredientInput].join(' ')} />
                  <label htmlFor={`ing-${index}`} 
                        className={[componentStyles.formLabel, componentStyles.ingredientLabel].join(' ')}>
                    Ingredient
                  </label>
                </div>
                <div style={{ position: 'relative', left: '1.5rem', width: '15%' }}>
                  <input id={`quantity-${index}`} 
                        onChange={(e) => editIngredient(ingredient.id, 'quantity', e.target.value)}
                        placeholder=' ' 
                        defaultValue={ingredient.quantity} 
                        className={[componentStyles.formInput, componentStyles.opacityInput, componentStyles.ingredientInput, componentStyles.quantityInput].join(' ')} />
                  <label htmlFor={`quantity-${index}`}  
                        className={[componentStyles.formLabel, componentStyles.ingredientLabel].join(' ')}>
                    Quantity
                  </label>
                </div>
                <div style={{ position: 'relative', left: '3rem', width: '15%' }}>
                  <input id={`metric-${index}`} 
                        onChange={(e) => editIngredient(ingredient.id, 'ingredient', e.target.value)}
                        placeholder=' ' 
                        defaultValue={ingredient.metric} 
                        className={[componentStyles.formInput, componentStyles.opacityInput, componentStyles.ingredientInput, componentStyles.quantityInput].join(' ')} />
                  <label htmlFor={`metric-${index}`} 
                        className={[componentStyles.formLabel, componentStyles.ingredientLabel].join(' ')}>
                    Metric
                  </label>
                </div>
              </div>
              <IconButton onClick={() => removeIngredient(ingredient.id)} sx={{color: 'white'}}>
                <RemoveCircleOutlineOutlined />
              </IconButton>
            </div>
          )
        })}
        <IngredientInput submitIngredient={addIngredient}/>
      </div>
    </div>
  )
}

const IngredientsForm = forwardRef(IngredientsFormI);
export default IngredientsForm;