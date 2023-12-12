import { createRef, useState } from "react";
import { Button } from "@mui/material";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';

import componentStyles from './../styles/IngredientInput.module.scss';
import DashedInput from "./DashedInput";

const addIngredientButtonStyle = {
  color: 'white', ml: '1.5rem'
}

const IngredientInput = ({ submitIngredient }) => {
  const [canAddIngredient, setCanAddIngredient]= useState(false);

  const ingredientInputRef = createRef();
  const quantityInputRef = createRef();
  const metricInputRef = createRef();

  const addIngredient = () => {
    submitIngredient({
      id: uuidv4(),
      ingredient: ingredientInputRef.current.value, 
      quantity: quantityInputRef.current.value,
      metric: metricInputRef.current.value
    });

    ingredientInputRef.current.value = '';
    quantityInputRef.current.value = '';
    metricInputRef.current.value = '';
    ingredientInputRef.current.focus();

    setCanAddIngredient(false);
  }

  const checkCanAddIngredient = () => {
    setCanAddIngredient(
      !!ingredientInputRef.current.value &&
      !!quantityInputRef.current.value
    )
  }

  return (
    <div className={componentStyles.container}>
      <div className={componentStyles.inputContainer}>
        <div className={[componentStyles.input, componentStyles.ingredientInput].join(' ')}>
          <DashedInput idLink='newIngInput' 
                    ref={ingredientInputRef} 
                    label='Ingredient' 
                    type='text' 
                    onChange={checkCanAddIngredient}/>
        </div>
        <div className={[componentStyles.input, componentStyles.quantityInput].join(' ')}>
          <DashedInput idLink='newQuanInput' 
                    ref={quantityInputRef} 
                    label='Quantity' 
                    type='text' 
                    onChange={checkCanAddIngredient}/>
        </div>
        <div className={[componentStyles.input, componentStyles.metricInput].join(' ')}>
          <DashedInput idLink='newMetInput' 
                    ref={metricInputRef} 
                    label='Metric' 
                    type='text' 
                    onChange={checkCanAddIngredient}/>
        </div>
      </div>
      <Button onClick={addIngredient}
              startIcon={<AddCircleOutlineOutlined />} 
              color='secondary'
              disabled={!canAddIngredient}
              sx={ addIngredientButtonStyle }>
          Add
      </Button>
    </div>
  )
};

IngredientInput.propTypes = {
  submitIngredient: PropTypes.func
}

export default IngredientInput;