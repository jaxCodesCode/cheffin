import { createRef, forwardRef, useState, useImperativeHandle } from "react";

import componentStyles from './../styles/RecipeInfoForm.module.scss';
import DashedInput from "./DashedInput";
import DashedTextArea from "./DashedTextArea";

const RecipeInfoFormI = (_, ref) => {

  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const titleInputRef = createRef();
  const servesInputRef = createRef();
  const descriptionInputRef = createRef();

  useImperativeHandle(ref, () => ({
    getRecipeInfo() {
      return {
        title: titleInputRef.current.value,
        description: descriptionInputRef.current.value,
        serves: servesInputRef.current.value,
        image: imageFile
      };
    }
  }))

  const onImageUpload = (e) => {
    setImageFile(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className={componentStyles.formContainer} 
        style={{backgroundImage: `url(${image})`, border: image ? '2px solid blue' : null}}>
      <div className={componentStyles.formContentContainer}>
        <div>
          <div className={[componentStyles.inputContainer, componentStyles.titleInputContainer].join(' ')}>
            <DashedInput idLink='titleInput'
                      label='New Recipe Title'
                      type='text'
                      ref={titleInputRef}
                      fontSize='1.5rem'/>
          </div>
          <div className={[componentStyles.inputContainer, componentStyles.descriptionInputContainer].join(' ')}>
            <DashedTextArea idLink='descriptionInput'
                          label='Description of Recipe'
                          ref={descriptionInputRef}/>
          </div>
          <div className={[componentStyles.inputContainer, componentStyles.servesInputContainer].join(' ')}>
            <DashedInput idLink='servesInput'
                      label='Serves'
                      type='text'
                      ref={servesInputRef} />
          </div>
        </div>
        <div style={{paddingBottom: '1rem'}}>
          <label htmlFor='imageInput' 
                className={componentStyles.imageInput}>
            Attach a Photo
          </label>
          <input id='imageInput' 
                type='file' 
                accept='image/*'  
                onChange={(e) => onImageUpload(e)}
                className={componentStyles.hideInput}/> 
        </div>
      </div>
    </div>
  )
}

const RecipeInfoForm = forwardRef(RecipeInfoFormI)

export default RecipeInfoForm;