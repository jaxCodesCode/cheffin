import { forwardRef, useState, useImperativeHandle } from "react"

// TODO: move styles to dedicated stylesheet
import componentStyles from './../styles/StepsForm.module.scss';
import StepInput from "./StepInput";

const StepsFormI = (_, ref) => {
  const [stepList, setStepList] = useState([]);

  useImperativeHandle(ref, () => ({
    getSteps() {
      return stepList;
    }
  }))

  const addStep = (step) => {
    setStepList([...stepList, step])
  }

  const editStep = (changeIndex, value) => {
    setStepList(stepList.map((step, index) => {
      return changeIndex === index ? value : step;
    }))
  }

  return (
    <div className={componentStyles.formContainer}>
      Steps
      <div style={{paddingLeft: '0.5rem', paddingRight: '0.5rem', overflowY: 'auto', overflowX: 'hidden', height: '31vh'}}>
        { stepList.map((step, index) => {
          return (
            <div key={index} style={{ display: 'flex', padding: '0.5rem 0'}}>
              <div style={{ marginRight: '0.5rem', display: 'flex', width: '100%', paddingLeft: '0.5rem', borderLeft: 'thin dashed white' }}>
                <div style={{position: 'relative', height: '3.5rem', width: '100%'}}>
                  <textarea id={`step-${index}`}
                          defaultValue={step} 
                          onChange={(e) => editStep(index, e.target.value)}
                          className={[componentStyles.formInput, componentStyles.opacityInput, componentStyles.ingredientInput].join(' ')}
                          style={{resize: 'none', width: '-webkit-fill-available', padding: '0.5rem'}}/>
                  <label htmlFor={`step-${index}`} className={[componentStyles.formLabel, componentStyles.nextStepLabel].join(' ')}>
                    {`Step ${index + 1 }`}
                  </label>
                </div>
              </div>
            </div>
          )
        })}
        <StepInput submitStep={addStep}/>
      </div>
    </div>
  )
}

const StepsForm = forwardRef(StepsFormI);

export default StepsForm;