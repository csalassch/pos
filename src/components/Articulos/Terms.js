/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Label } from 'reactstrap';

class Terms extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: props.getStore().email,
          gender: props.getStore().gender,
        };
        // eslint-disable-next-line no-underscore-dangle
        this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    
        this.validationCheck = this.validationCheck.bind(this);
        this.isValidated = this.isValidated.bind(this);
      }
    
      isValidated() {
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
      }
    
      render() {
        // explicit class assigning based on validation
        const notValidClasses = {};
    
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
        }
        return (
          <div className="step step1 mt-5 ">
            <div className="row justify-content-md-center">
              <div className="col col-lg-6">
                <div className="">
                  <h4>Welcome, Please Enter your info</h4>
                  <form id="Form" className="form-horizontal mt-2">
                    <div className="form-group content form-block-holder">
                      <Label className="control-label">Gender</Label>
                      <div>
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
                      </div>
                    </div>
                    <div className="form-group content form-block-holder">
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
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }
}
export default Terms;