// TODO: move styles to dedicated stylesheet
import componentStyles from './../styles/DashedTextArea.module.scss';
import { forwardRef } from 'react';

const DashedTextAreaI = ({ onChange, label, idLink }, ref) => {

  return (
    <>
      <textarea id={idLink} 
            ref={ref}
            onChange={onChange}
            placeholder=' '
            className={componentStyles.input}/>
      <label htmlFor={idLink} 
            className={componentStyles.label}>
        {label}
      </label>
    </>
  )
};


const DashedTextArea = forwardRef(DashedTextAreaI);
export default DashedTextArea;