import React, { Component } from 'react';
// import { Label } from 'reactstrap';
import { Label, Col, Row, FormGroup, Input, InputGroup, InputGroupText,Button, Collapse, Table, FormFeedback } from 'reactstrap';

export default class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  render() {
    return (
      <div className="step step2 mt-5">
        <div className="row justify-content-md-center">
          <div className="col-lg">
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
                <Input type="checkbox" id="checkVariantes" onChange={(e) => { this.setState({ checked: e.target.checked }); console.log(this.state.checked, " checked") }} />
                <Label check>Tiene Variantes</Label>
              </FormGroup>

              <Collapse isOpen={this.state.checked}>
                <Row style={{ marginBottom: "10px" }}>
                  <Col md="6">
                    <InputGroup>
                      <InputGroupText style={{ minWidth: "80px" }}>Nombre</InputGroupText>
                      <Input placeholder="Nombre" />
                    </InputGroup>
                  </Col>
                  <Col md="6">
                    <InputGroup>
                      <InputGroupText style={{ minWidth: "80px",display:"flex",justifyContent:"center" }}>SKU</InputGroupText>
                      <Input placeholder="UGG-BB-PUR-06" />
                    </InputGroup>
                  </Col>

                </Row>
                <Row>

                  <Col md="6">
                    <InputGroup>

                      <InputGroupText className='text-center' style={{ minWidth: "83px", textAlign: "center", margin: "auto", display:"flex", justifyContent:"center" }}>$</InputGroupText>
                      <Input type='number' step='any' placeholder="Precio" />
                    </InputGroup>
                  </Col>
                  <Col>
                    <div className='d-flex justify-content-end'>

                    <Button type="submit" className="btn btn-success">Añadir</Button>
                    </div>
                    {/* <Icon.Plus className='btn btn-icon' style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /> */}

                  </Col>
                </Row>
                <Table responsive>
                  <thead style={{textAlign:"center"}}>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>SKU</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody style={{textAlign:"center"}}>
                    <tr>
                      <th scope="row">1</th>
                      <td>Rojo</td>
                      <td>ZAP-ROUGE-0987-98</td>
                      <td>$ 235.00</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Azul Celeste</td>
                      <td>ZAP-BLUE-0234-877</td>
                      <td>$ 225.50</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Azul Marino</td>
                      <td>ZAP-DBLUE-896-009</td>
                      <td>$ 195.50</td>
                    </tr>
                  </tbody>
                </Table>
              </Collapse>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupText>$</InputGroupText>
                <Input type='number' step='any' min={0.1} placeholder="Precio" disabled={this.state.checked}/>
                <FormFeedback>Error</FormFeedback>
              </InputGroup>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}
