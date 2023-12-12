import { Button } from "@mui/material"
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined"
import DashedTextArea from "./DashedTextArea"
import { createRef, useState } from "react";

const StepInput = ({ submitStep }) => {
  const [canAddStep, setCanAddStep] = useState(false);
  
  const stepInputRef = createRef();

  const checkCanAddStep = () => {
    setCanAddStep(!!stepInputRef.current.value);
  }

  const addStep = () => {
    const step = stepInputRef.current.value;
    submitStep(step);

    stepInputRef.current.value = '';
    stepInputRef.current.focus();

    setCanAddStep(false);
  }

  return (
    <div style={{alignItems: 'flex-start', display: 'flex', flexDirection: 'column', padding: '0.25rem 0'}}>
      <div style={{ width: '-webkit-fill-available', borderLeft: 'thin dashed white', paddingLeft: '1.5rem'}}>
        <div style={{position: 'relative', height: '3.5rem'}}>
          <DashedTextArea idLink='stepInput' label='Next Step' onChange={checkCanAddStep} ref={stepInputRef}/>
        </div>
      </div>
      <Button onClick={addStep}
            startIcon={<AddCircleOutlineOutlined />} 
            color='secondary'
            disabled={!canAddStep}
            sx={{ display: 'flex', color: 'white', ml: '1.5rem' }}>
        Add
      </Button>
    </div>
  )
};

export default StepInput;