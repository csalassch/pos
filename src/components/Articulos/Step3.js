import React, { Component } from 'react';

import { Input, FormGroup, InputGroup, InputGroupText, FormFeedback } from 'reactstrap';

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
              <InputGroup>
                <InputGroupText style={{ width: "135px" }}>Calle</InputGroupText>
                <Input placeholder="Nombre Calle" type='text' />
                <FormFeedback>error</FormFeedback>
              </InputGroup>


            </FormGroup>
            <FormGroup>

              <InputGroup>
                <InputGroupText style={{ width: "135px" }}>Num. Exterior</InputGroupText>
                <Input placeholder="#" type='text' />
                <FormFeedback>error</FormFeedback>
              </InputGroup>


            </FormGroup>
            <FormGroup>


              <InputGroup>
                <InputGroupText style={{ width: "135px" }}>C.P</InputGroupText>
                <Input placeholder="e.j. 76148" type='text' />
                <FormFeedback>error</FormFeedback>
              </InputGroup>

            </FormGroup>
            <FormGroup>


              <InputGroup>
                <InputGroupText style={{ width: "135px" }}>Ciudad</InputGroupText>
                <Input placeholder="Querétaro" type='text' />
                <FormFeedback>error</FormFeedback>
              </InputGroup>

            </FormGroup>
            <FormGroup>


              <InputGroup>
                <InputGroupText style={{ width: "135px" }}>Estado</InputGroupText>
                <Input placeholder="Querétaro" type='text' />
                <FormFeedback>error</FormFeedback>
              </InputGroup>

            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}
