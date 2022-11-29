// import react from 'react';
import React from 'react';

import StepZilla from 'react-stepzilla';
import './steps.scss';

import About  from './About';
import Terms from './Terms';
import  ConsentForm  from './ConsentForm';

const steps =
    [
        { name: 'Info Básica', component: <About /> },
        { name: 'Ubicación', component: <Terms /> },
        { name: 'Fin', component: <ConsentForm /> }
    ]
const MultiSteps = () => {
    return (
        <div className='step-progress'>
            <StepZilla steps={steps} nextTextOnFinalActionStep="Save" />
        </div>
    );
}
export default MultiSteps;