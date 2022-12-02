/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Select from 'react-select';
import { Label, Col, Row, FormGroup, Form, Input, InputGroup, InputGroupText, FormFeedback } from 'reactstrap';
// import { push, onValue, ref as refDB } from 'firebase/database';
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// import { dbStorage, db } from '../../FirebaseConfig/firebase';
// import { useAuth } from '../../Context/authContext';

export default class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /*email: props.getStore().email,
      gender: props.getStore().gender,*/
    };
    // eslint-disable-next-line no-underscore-dangle
    /*this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);*/
  }

  /*isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (
      Object.keys(validateNewInput).every((k) => {
        return validateNewInput[k] === true;
      })
    ) {
      if (
        this.props.getStore().email !== userInput.email ||
        this.props.getStore().gender !== userInput.gender
      ) {
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
    if (!this._validateOnDemand) return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(
      Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)),
    );
  }

  _validateData(data) {
    return {
      genderVal: data.gender !== '', // required: anything besides N/A
      emailVal:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          data.email,
        ), // required: regex w3c uses in html5
    };
  }

  _validationErrors(val) {
    const errMsgs = {
      genderValMsg: val.genderVal ? '' : 'A gender selection is required',
      emailValMsg: val.emailVal ? '' : 'A valid email is required',
    };
    return errMsgs;
  }

  _grabUserInput() {
    return {
      gender: this.gender.value,
      email: this.email.value,
    };
  }*/

  render() {
    // explicit class assigning based on validation
    /*const notValidClasses = {};

    if (typeof this.state.genderVal === 'undefined' || this.state.genderVal) {
      notValidClasses.genderCls = 'form-select mb-3';
    } else {
      notValidClasses.genderCls = 'is-invalid form-select';
      notValidClasses.genderValGrpCls = 'text-danger';
    }

    if (typeof this.state.emailVal === 'undefined' || this.state.emailVal) {
      notValidClasses.emailCls = 'form-control';
    } else {
      notValidClasses.emailCls = 'is-invalid form-control';
      notValidClasses.emailValGrpCls = 'text-danger';
    }*/
    // const [processing, setProcessing] = this.setState(false);
    const style = { width: "450px" };
    // const [visible, setVisible] = this.setState(false);
    // const [message, setMessage] = this.setState("");
    // const [colorAlert, setAlertColor] = this.setState("success");
    // const [picture, setPicture] = this.setState([]);
    // const [idImageTemp, setIdImageTemp] = this.setState({});
    // const { user } = useAuth();


    // const onDismiss = () => {
    //     setVisible(false);
    // };
    //   const addProductImage = (imageTemp) => {
    //     setIdImageTemp({});
    //     console.log("here",picture,idImageTemp);
    //     setProcessing(true);
    //     if (imageTemp == null || !imageTemp) {
    //         console.log("file is null");
    //         return;

    //     }
    //     console.log(imageTemp.name);
    //     const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    //     if (!allowedExtensions.exec(imageTemp.name)) {
    //         console.log("here2");
    //         setVisible(true);
    //         setAlertColor("danger");
    //         setMessage("Error! favor de seleccionar archivos .JPG, .JPEG, .PNG");
    //         setProcessing(false);
    //         setPicture([]);
    //         return;
    //     }
    //     setPicture(imageTemp);
    //     /*const storageRef = ref(dbStorage, `/temp/${user.uid}/${imageTemp.name}`);

    //     uploadBytes(storageRef, imageTemp).then(() => {
    //         setProcessing(false);

    //         getDownloadURL(storageRef).then((url) => {

    //             const img = document.getElementById('imageProductRetrieved');

    //             img.setAttribute('src', url);
    //             setIdImageTemp({ name: imageTemp.name, url: url, extension: "jpg" });

    //         })
    //             .catch((error) => {
    //                 // Handle any errors
    //                 console.log(error);
    //             });

    //     });*/


    //     // setResetValImage(imageTemp.name);
    //     console.log("file uploaded:", imageTemp);
    // }

    const colourStyles = {
      option: (provided) => ({
        ...provided,
        color: "black",
        padding: 20,
      }), multiValue: (styles) => {

        return {
          ...styles,
          backgroundColor: "#d2cef9",
        };
      },
      multiValueLabel: (styles) => ({
        ...styles,
        color: "#212121",

      }),
    };
    return (
      <div className="step step1 mt-5 ">
        <div className="row justify-content-md-center">
          <div className="col col-lg">
            <div className="">
              {/* <h4>Bienvenido, favor de ingresar todos los campos</h4> */}
              <form id="Form" className="form-horizontal mt-2">
                <Row>
                  {/* <Alert color={colorAlert} isOpen={visible} toggle={onDismiss.bind(null)}>
                                    {message}
                                </Alert> */}
                  <Col md="4">
                    <div className="form-group content form-block-holder">
                      {/* <Label className="control-label">Gender</Label> */}
                      {/* <div hidden>
                        <select
                          // ref="gender"
                          ref={(e) => {
                            this.gender = e;
                          }}
                          autoComplete="off"
                          className={notValidClasses.genderCls}
                          required
                          defaultValue={this.state.gender}
                          onBlur={this.validationCheck}
                        >
                          <option value="">Please select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className={notValidClasses.genderValGrpCls}>{this.state.genderValMsg}</div>
                      </div> */}
                      <FormGroup>
                        <Label htmlFor="exampleFile">Imagen Artículo</Label>

                        <img id="imageProductRetrieved"
                          alt="..."
                          className=" img-fluid rounded shadow-lg"
                          src="https://i0.wp.com/zaveriamexico.com/wp-content/uploads/2022/02/04-scaled.jpg?fit=2560%2C1707&ssl=1"
                          style={style}
                        ></img>


                      </FormGroup>
                      <Form>
                        <FormGroup>
                          <Input id='fileInput' type="file" placeholder='selecciona archivo' onChange={(e) => {
                            console.log("file selected: ", e.target.files[0]);
                          }} />
                        </FormGroup>
                      </Form>
                    </div>
                  </Col>
                  <Col>
                    {/* <div className="form-group content form-block-holder" hidden>
                      <Label className="control-label ">Email</Label>
                      <div>
                        <input
                          // ref="email"
                          ref={(f) => {
                            this.email = f;
                          }}
                          autoComplete="off"
                          type="email"
                          placeholder="john.smith@example.com"
                          className={notValidClasses.emailCls}
                          required
                          defaultValue={this.state.email}
                          onBlur={this.validationCheck}
                        />
                        <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
                      </div>
                    </div> */}
                    <FormGroup>
                      <InputGroup>
                        <InputGroupText style={{ width: "135px" }}>Nombre Artículo</InputGroupText>
                        <Input placeholder="Nombre" type='text' />
                        <FormFeedback>error</FormFeedback>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupText style={{ width: "135px" }}>SKU</InputGroupText>
                        <Input placeholder="UGG-876-789-02" type='text' />
                        <FormFeedback>error</FormFeedback>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="exampleFile">Categorías</Label>

                      <Select
                        closeMenuOnSelect={false}
                        // defaultValue={[arrayCategories[1]]}
                        isMulti
                        options={[{ value: 'Categoría 1', label: 'Categoría 1' }, { value: 'Categoría 2', label: 'Categoría 2' }, { value: 'Categoría 3', label: 'Categoría 3' }, { value: 'Categoría 4', label: 'Categoría 4' }]}
                        styles={colourStyles}
                      // value={[{ value: idCategoriesArr.txt, label: idCategoriesArr.txt }]}

                      // onChange={(e) => { const arrCatAux = []; for (let i = 0; i < e.length; i++) { if (!arrCatAux.includes(e[i].key)) { arrCatAux.push(e[i].key); } } console.log(arrCatAux); setIdCategoriesArr(arrCatAux); }}

                      />
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupText style={{ width: "135px" }} className="text-center">Descripción</InputGroupText>
                        <Input type="textarea" rows="5" />
                        <FormFeedback>Error</FormFeedback>
                      </InputGroup>

                    </FormGroup>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
