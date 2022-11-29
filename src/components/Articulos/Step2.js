import React, { Component } from 'react';
// import { Label } from 'reactstrap';
import { Label, Col, Row, FormGroup, Input, InputGroup, InputGroupText, Collapse, Button, Table,FormFeedback } from 'reactstrap';

export default class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="step step2 mt-5">
        <div className="row justify-content-md-center">
          <div className="col-lg-8">
            {/* <form>
              <div className="mb-3 row">
                <Label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Date of Birth
                </Label>
                <div className="col-sm-2">
                  <select className="form-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="col-sm-4">
                  <select className="form-select">
                    <option value="Jan">January</option>
                    <option value="Feb">February</option>
                    <option value="Mar">March</option>
                  </select>
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control" placeholder="Year" />
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Home Address
                </Label>
                <div className="col-sm-10">
                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <input type="text" className="form-control" placeholder="Street Address" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <input type="text" className="form-control" placeholder="Suburb" />
                    </div>
                    <div className="col-sm-3">
                      <select className="form-select">
                        <option value="nsw">NSW</option>
                        <option value="hfk">HFK</option>
                        <option value="uyr">UYR</option>
                      </select>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" placeholder="Postcode" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="gender" className="col-sm-2 col-form-label">
                  Gender
                </Label>
                <div className="col-sm-10">
                  <select className="form-select">
                    <option>Select Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </Label>
                <div className="col-sm-10">
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="pphone" className="col-sm-2 col-form-label">
                  Primary Phone
                </Label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Primary Number" />
                </div>
              </div>
              <div className="mb-3 row">
                <Label htmlFor="ophone" className="col-sm-2 col-form-label">
                  Other Phone
                </Label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Other Number" />
                </div>
              </div>
            </form> */}
            <FormGroup>
              <FormGroup check>
                <Input type="checkbox" id="checkVariantes" />
                <Label check>Tiene Variantes</Label>
              </FormGroup>

              <Collapse >
                <Row>
                  <Col md="3">
                    <InputGroup>
                      <InputGroupText>Nombre</InputGroupText>
                      <Input placeholder="Nombre" />
                    </InputGroup>
                  </Col>
                  <Col md="4">
                    <InputGroup>
                      <InputGroupText>SKU</InputGroupText>
                      <Input placeholder="UGG-BB-PUR-06" />
                    </InputGroup>
                  </Col>
                  <Col md="3">
                    <InputGroup>
                      <InputGroupText>$</InputGroupText>
                      <Input type='number' step='any' placeholder="Precio" />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Button type="submit" className="btn btn-info">Añadir</Button>

                  </Col>
                </Row>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </Collapse>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupText>$</InputGroupText>
                <Input type='number' step='any' min={0.1} placeholder="Precio"/>
                <FormFeedback>Error</FormFeedback>
              </InputGroup>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}
