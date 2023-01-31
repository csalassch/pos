/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

// import { Label } from 'reactstrap';
import * as Icon from 'react-feather';

import { Label, Col, Row, FormGroup, Button, Collapse, Alert } from 'reactstrap';

export default class Step2 extends Component {
  constructor(props) {
    super(props);
    console.log("PROPSS STEP 2: ", props.getStore());

    this.state = {
      checked: false,

      // variantName:'',
      // variantSku:'',
      // variantPrice:'',
      hasVariants: props.getStore().hasVariants,
      productPrice: props.getStore().productPrice,
      visible: false,
      message: "",

      variantDetails: props.getStore().variantDetails
    };

    // eslint-disable-next-line no-underscore-dangle
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (this.props.getStore().variantDetails) {

      console.log("TABLE ACT: ", this.props.getStore().variantDetails);
    }

    console.log("TABLE EXEC: ", this.variantDetails);
    console.log("TABLE EXEC PREV: ", prevProps.getStore().variantDetails);


  }

  onDismiss() {
    this.setState({ visible: false });
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
      productPriceVal: data.hasVariants === false ? Number.isNaN(data.productPrice) === false : true,
      variantDetailsVal: data.hasVariants === true && data.variantDetails? data.variantDetails.length !== 0 : true,
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

      hasVariants: this.hasVariants,
      productPrice: this.productPrice.value,
      // variantDetails: this.variantDetails,
      variantDetails: this.hasVariants === true ? this.variantDetails : [0],
    };
  }

  async pushVariant() {
    const objVariantInput = {
      name: document.getElementById('variantName').value,
      sku: document.getElementById('variantSku').value,
      price: document.getElementById('variantPrice').value,


      options: <div><Button color='secondary' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Trash style={{ maxWidth: "18px", color: "#ef5350" }} /></Button></div>
    }
    //Check if name or sku already exists as a variant

      if (this.state.variantDetails.some(e => e.name === objVariantInput.name || e.sku === objVariantInput.sku) === false) {
  
        this.state.variantDetails.push(objVariantInput);
  
        console.log(this.state.variantDetails);
      } else {
        //Ask the user to choose another name or sku
        this.setState({ visible: true });
        this.setState({ message: "Variante con nombre o SKU existente. Favor de escoger otro" });
      }
      this.variantDetails = this.state.variantDetails;
    // return this.state.variantDetails;
  }

  async changeCheckValues(e) {
    this.hasVariants = e.target.checked;
    this.state.hasVariants = e.target.checked;
    this.state.checked= e.target.checked;
    this.setState({ checked: e.target.checked });
    console.log(this.hasVariants, " checked");

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

    // let auxVar=[];


    return (
      <div className="step step2 mt-5">
        <div className="row justify-content-md-center">
          <div className="col-lg">
            <Alert color="danger" isOpen={this.state.visible}
              toggle={this.onDismiss.bind(this)}
            >
              {this.state.message}
            </Alert>
            <FormGroup>
              <FormGroup check>
                <input defaultChecked={this.state.hasVariants} type="checkbox" id="checkVariantes" onChange={(e) => {
                  this.changeCheckValues(e);
                }} />
                <Label className='labels' check> Tiene Variantes</Label>
              </FormGroup>

              <Collapse isOpen={this.state.hasVariants}>
                <Row style={{ marginBottom: "10px" }}>
                  <Col md="6">
                    <Label className='labels' style={{ minWidth: "80px" }}>Nombre</Label>
                    <input id='variantName' placeholder="Ej. Cartera Roja" type='text'
                      // ref={(f)=>{
                      //   this.state.variantName=f;
                      // }}
                      // onChange={this.validationCheck}
                      // onChange={(e) => {
                      //   console.log(e.target);
                      // }}
                      // defaultValue={this.state.variantName} 
                      autoComplete='off'
                      className={`${notValidClasses.variantDetailsCls} inputBox`} required />
                    <div className={notValidClasses.variantDetailsValGrpCls}>{this.state.variantDetailsValMsg}</div>

                  </Col>
                  <Col md="6">
                    <Label className='labels'>SKU</Label>
                    <input id='variantSku' placeholder="UGH-76-THG" type='text'
                      //  ref={(f)=>{
                      //   this.state.variantSku=f;
                      // }}
                      // onChange={this.validationCheck}
                      // defaultValue={this.state.variantSku}
                      autoComplete='off'
                      className={`${notValidClasses.variantDetailsCls} inputBox`} required />
                    <div className={notValidClasses.variantDetailsValGrpCls}>{this.state.variantDetailsValMsg}</div>

                  </Col>

                </Row>
                <Row>

                  <Col md="6">

                    <Label className='labels'>Precio</Label>
                    <input id='variantPrice' placeholder="UGH-76-THG" type='text'
                      // ref={(f)=>{
                      //   this.state.variantPrice=f;
                      // }}
                      // onChange={this.validationCheck}
                      // defaultValue={this.state.variantPrice} 
                      autoComplete='off'
                      className={`${notValidClasses.variantDetailsCls} inputBox`} required />
                    <div className={notValidClasses.variantDetailsValGrpCls}>{this.state.variantDetailsValMsg}</div>

                  </Col>
                  <Col>
                    <div className='d-flex justify-content-end'>

                      <Button onClick={() => {
                        this.pushVariant(this).then(this.validationCheck);

                        //  this.variantDetails=auxVar;
                        // this.state.variantDetails=auxVar;
                        console.log(this.variantDetails);
                        // this.validationCheck();
                      }} type="submit" className="btn btn-success">Añadir</Button>
                    </div>
                    {/* <Icon.Plus className='btn btn-icon' style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /> */}

                  </Col>
                </Row>

                <div className='container-fluid mx-0 p-0 mt-2'>

                  <DataTable columns={[{
                    name: "Nombre",
                    selector: row => row.name
                  }, {
                    name: "SKU",
                    selector: row => row.sku
                  }, {
                    name: "Precio",
                    selector: row => row.price
                  }, {
                    name: "Opciones",
                    selector: row => row.options
                  }]} data={this.state.variantDetails} />
                </div>
              </Collapse>
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label className='labels'>Precio</Label>
                  <input type='text' disabled={this.state.checked} ref={(f) => {
                    this.productPrice = f;
                  }} onChange={this.validationCheck} defaultValue={this.state.productPrice} autoComplete='off'
                    className={`${notValidClasses.productPriceCls} inputBox`} />
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
