import React, { Component } from 'react';

import { Input, FormGroup, Label, FormFeedback } from 'reactstrap';

export default class Step3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:props.getStore().name,
      sku:props.getStore().sku,
      description:props.getStore().description,
      idCategoriesArr:props.getStore().idCategoriesArr,
      picture:props.getStore().picture
    };
  }

  newItemBtn(){
    console.log("DATA RECEIVED: ",this.state.name," - ",this.state.sku, " - ",this.state.description);
    console.log("PICTURE RECEIVED: ",this.state.picture);
    console.log("CATEGORIES RECEIVED: ",this.state.idCategoriesArr);

  }

  render() {
    return (
      <div className="step step3 mt-5">
        <div className="row justify-content-md-center">
          <div className="col-lg-8">
            <FormGroup>
              <Label style={{ width: "135px" }}>Calle</Label>
              <Input type='text' />
              <FormFeedback>error</FormFeedback>


            </FormGroup>
            <FormGroup>

              <Label style={{ width: "135px" }}>Num. Exterior</Label>
              <Input type='text' />
              <FormFeedback>error</FormFeedback>


            </FormGroup>
            <FormGroup>


              <Label style={{ width: "135px" }}>C.P</Label>
              <Input type='text' />
              <FormFeedback>error</FormFeedback>

            </FormGroup>
            <FormGroup>


              <Label style={{ width: "135px" }}>Ciudad</Label>
              <Input type='text' />
              <FormFeedback>error</FormFeedback>

            </FormGroup>
            <FormGroup>


              <Label style={{ width: "135px" }}>Estado</Label>
              <Input type='text' />
              <FormFeedback>error</FormFeedback>

            </FormGroup>
            <span
              className="btn btn-success text-white" 
              onClick={() => {
                //Consider that when this is clicked, to close the modal to avoid duplication.
                this.newItemBtn()
                // this.props.jumpToStep(4);
              }}
            >
              Guardar
            </span>
          </div>
        </div>
      </div>
    );
  }
}
