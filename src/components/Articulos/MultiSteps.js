// import react from 'react';

import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
import './steps.scss';

// import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

//  import ComponentCard from '../ComponentCard';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';


class MultiSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    
        this.sampleStore = {
          email: '',
          gender: '',
          savedToCloud: false,
        };
      }
    
      getStore() {
        return this.sampleStore;
      }
    
      updateStore(update) {
        this.sampleStore = {
          ...this.sampleStore,
          ...update,
        };
      }
    
      render() {
        const steps = [
          {
            name: 'Define Detalles',
            component: (
              <Step1
                getStore={() => this.getStore()}
                updateStore={(u) => {
                  this.updateStore(u);
                }}
              />
            ),
          },
          {
            name: 'Precio',
            component: (
              <Step2
                getStore={() => this.getStore()}
                updateStore={(u) => {
                  this.updateStore(u);
                }}
              />
            ),
          },
          {
            name: 'Ubicación',
            component: (
              <Step3
                getStore={() => this.getStore()}
                updateStore={(u) => {
                  this.updateStore(u);
                }}
              />
            ),
          },
          {
            name: 'Fin',
            component: (
              <Step4
                getStore={() => this.getStore()}
                updateStore={(u) => {
                  this.updateStore(u);
                }}
              />
            ),
          },
        ];
    
        return (
          <>
            
            
              <div className="example">
                <div className="step-progress" >
                  <StepZilla  steps={steps} nextTextOnFinalActionStep="Guardar" />
                </div>
              </div>
          </>
        );
      }
}
export default MultiSteps;