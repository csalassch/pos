/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import { Label } from 'reactstrap';
import * as Icon from 'react-feather';

import { Label, Col, Row, FormGroup, Button, Collapse, Table} from 'reactstrap';

export default class Step2 extends Component {
  constructor(props) {
    super(props);
    console.log("PROPSS STEP 2: ", props.getStore());

    this.state = {
      checked: false,
      hasVariants: props.getStore().hasVariants,
      productPrice: props.getStore().productPrice,
      variantDetails: props.getStore().variantDetails
    };

    // eslint-disable-next-line no-underscore-dangle
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  isValidated() {

    const userInput = this._grabUserInput(); // grab user entered vals
    console.log("TRGERRED finally ", userInput);
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (
      Object.keys(validateNewInput).every((k) => {
        return validateNewInput[k] === true;
      })
    ) {
      if (this.props.getStore().hasVariants !== userInput.hasVariants || this.props.getStore().productPrice !== userInput.productPrice || this.props.getStore().variantDetails !== userInput.variantDetails) {
        // only update store of something changed
        this.props.updateStore({
          ...userInput,
          savedToCloud: false, // use this to notify step4 that some changes took place and prompt the user to save again
        }); // Update store here (this is just an example, in reality you will do it via redux or flux)
      }

      isDataValid = true;
    } else {
      // if anything fails then update the UI validation state but NOT the UI Data State
      this.setState(
        Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)),
      );
    }

    return isDataValid;
  }

  validationCheck() {
    console.log("TRGERRED valiadtioonCheck ");

    if (!this._validateOnDemand) return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    console.log("HERE val", userInput);
    console.log("HERE val2", validateNewInput);
    this.setState(
      Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)),
    );
  }

  _validateData(data) {
    console.log("ValidateData received: ", data);
    return {

      // hasVariantsVal: data.hasVariants !== '',
      productPriceVal: data.productPrice !== '' && Number.isNaN(data.productPrice) === false,
      variantDetailsVal: data.hasVariants === true ? data.variantDetails.length !== 0 : true,
      // required: regex w3c uses in html5
    };
  }

  _validationErrors(val) {
    const errMsgs = {

      productPriceValMsg: val.productPriceVal ? '' : 'A valid Price is required',
      variantDetailsValMsg: val.variantDetailsVal ? '' : 'Invalid fields',

    };
    return errMsgs;
  }

  _grabUserInput() {
    return {

      hasVariants: this.hasVariants.value,
      productPrice: this.productPrice.value,
      variantDetails: this.hasVariants.value === true ? this.variantDetails : [0],
    };
  }

  render() {

    const notValidClasses = {};

    if (typeof this.state.productPriceVal === 'undefined' || this.state.productPriceVal) {
      notValidClasses.productPriceCls = 'form-control';
    } else {
      notValidClasses.productPriceCls = 'is-invalid form-control';
      notValidClasses.productPriceValGrpCls = 'text-danger';
    }
    //For Variants invalid or valid classname
    if (typeof this.state.variantDetailsVal === 'undefined' || this.state.variantDetailsVal) {
      notValidClasses.variantDetailsCls = 'form-control';
    } else {
      notValidClasses.variantDetailsCls = 'is-invalid form-control';
      notValidClasses.variantDetailsValGrpCls = 'text-danger';
    }



    return (
      <div className="step step2 mt-5">
        <div className="row justify-content-md-center">
          <div className="col-lg">
            <FormGroup>
              <FormGroup check>
                <input type="checkbox" id="checkVariantes" onChange={(e) => {
                  this.hasVariants = e.target.checked;
                  this.state.hasVariants = e.target.checked;
                  this.setState({ checked: e.target.checked });
                  console.log(this.state.checked, " checked")
                }} />
                <Label check> Tiene Variantes</Label>
              </FormGroup>

              <Collapse isOpen={this.state.checked}>
                <Row style={{ marginBottom: "10px" }}>
                  <Col md="6">
                    <Label style={{ minWidth: "80px" }}>Nombre</Label>
                    <input placeholder="Ej. Cartera Roja" type='text'
                    ref={(f)=>{
                      console.log(f);
                    }}
                      onBlur={this.validationCheck}
                      // onChange={(e) => {
                      //   console.log(e.target);
                      // }}
                      defaultValue={this.state.variantDetails} autoComplete='off'
                      className={notValidClasses.variantDetailsCls} required />
                    <div className={notValidClasses.variantDetailsValGrpCls}>{this.state.variantDetailsValMsg}</div>

                  </Col>
                  <Col md="6">
                    <Label>SKU</Label>
                    <input placeholder="UGH-76-THG" type='text'
                      onBlur={this.validationCheck}
                      onChange={(e) => {
                        console.log("SKU CHNG: ", e);
                      }}
                      defaultValue={this.state.variantDetails} autoComplete='off'
                      className={notValidClasses.variantDetailsCls} required />
                    <div className={notValidClasses.variantDetailsValGrpCls}>{this.state.variantDetailsValMsg}</div>

                  </Col>

                </Row>
                <Row>

                  <Col md="6">

                    <Label>Precio</Label>
                    <input placeholder="UGH-76-THG" type='text'
                      onBlur={this.validationCheck}
                      onChange={(e) => {
                        console.log("PRICE CHNG: ", e);
                      }}
                      defaultValue={this.state.variantDetails} autoComplete='off'
                      className={notValidClasses.variantDetailsCls} required />
                    <div className={notValidClasses.variantDetailsValGrpCls}>{this.state.variantDetailsValMsg}</div>

                  </Col>
                  <Col>
                    <div className='d-flex justify-content-end'>

                      <Button type="submit" className="btn btn-success">Añadir</Button>
                    </div>
                    {/* <Icon.Plus className='btn btn-icon' style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /> */}

                  </Col>
                </Row>
                <Table responsive>
                  <thead style={{ textAlign: "center" }}>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>SKU</th>
                      <th>Precio</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="row">1</th>
                      <td>Rojo</td>
                      <td>ZAP-ROUGE-0987-98</td>
                      <td>$ 235.00</td>
                      <td><Icon.Trash style={{ color: "red", width: "17px" }} /></td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Azul Celeste</td>
                      <td>ZAP-BLUE-0234-877</td>
                      <td>$ 225.50</td>
                      <td><Icon.Trash style={{ color: "red", width: "17px" }} /></td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Azul Marino</td>
                      <td>ZAP-DBLUE-896-009</td>
                      <td>$ 195.50</td>
                      <td><Icon.Trash style={{ color: "red", width: "17px" }} /></td>
                    </tr>
                  </tbody>
                </Table>
              </Collapse>
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Precio</Label>
                  <input type='text' disabled={this.state.checked} ref={(f) => {
                    this.productPrice = f;
                  }} onChange={this.validationCheck} defaultValue={this.state.productPrice} autoComplete='off'
                    className={notValidClasses.productPriceCls} />
                  <div className={notValidClasses.productPriceValGrpCls}>{this.state.productPriceValMsg}</div>

                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
