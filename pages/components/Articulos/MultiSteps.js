// import react from 'react';

import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
// import './steps.scss';

// import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

//  import ComponentCard from '../ComponentCard';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
// import Step4 from './Step4';


class MultiSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("PROPS MULTI: ",this.props.user);
    //For storing the data on each step, updating, etc.
        this.sampleStore = {
          email: '',
          
          gender: '',
          savedToCloud: false,
          user:this.props.user,
          //For all fields on step 1
          name:'',
          sku:'',
          idCategoriesArr:[{}],
          description:'',
          picture:[],
          urlImage:"",
          hasVariants:false,
          productPrice:"",
          variantDetails:[]
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
            name: 'Detalles',
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
          }
        ];
        console.log("Length Steps: ",steps.length);
        return (
          <>
            
            
              <div className="example">
                <div className="step-progress" >
                  <StepZilla  steps={steps} nextTextOnFinalActionStep="Guardar"  />
                </div>
              </div>
          </>
        );
      }
}
export default MultiSteps;
