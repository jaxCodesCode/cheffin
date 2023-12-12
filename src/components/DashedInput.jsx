import componentStyles from './../styles/DashedInput.module.scss';
import { forwardRef } from 'react';

const DashInput = ({ onChange, type, label, idLink, fontSize }, ref) => {

  return (
    <>
      <input id={idLink} 
            ref={ref}
            onChange={onChange}
            placeholder=' ' 
            type={type}
            className={componentStyles.input}
            style={{ fontSize: fontSize ? fontSize : null }} />
      <label htmlFor={idLink} 
            className={componentStyles.label}>
        {label}
      </label>
    </>
  )
};


const DashedInput = forwardRef(DashInput);
export default DashedInput;