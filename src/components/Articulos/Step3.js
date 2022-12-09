import React, { Component } from 'react';

import { Input, FormGroup, Label, FormFeedback } from 'reactstrap';

export default class Step3 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
          </div>
        </div>
      </div>
    );
  }
}
