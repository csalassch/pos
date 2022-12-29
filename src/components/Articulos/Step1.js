/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Select from 'react-select';
import { Label, Col, Row, FormGroup, Alert } from 'reactstrap';
import { onValue, push, ref as refDB } from 'firebase/database';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { dbStorage, db } from '../../FirebaseConfig/firebase';

class Step1 extends Component {
  constructor(props) {
    super(props);
    console.log("PROPSS: ", props.getStore());

    this.state = {
      picture: props.getStore().picture,
      visible: false,
      alertColor: "danger",
      message: "",
      urlImage: props.getStore().urlImage,
      arrayCategories: [{ value: "", label: "" }],
      idImageTemp: { name: "", url: "", extension: "" },
      idImage: { name: "", url: "", extension: "" },
      sku: props.getStore().sku,
      description: props.getStore().description,
      idCategoriesArr: props.getStore().idCategoriesArr,
      name: props.getStore().name,
      user: props.getStore().user,
    };
    
    // eslint-disable-next-line no-underscore-dangle
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);


  }


  //This is like a useEffect for component class

  componentDidMount() {
    this.optionsCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.getStore().idCategoriesArr) {

      console.log("CHANEGD: ", this.state.idCategoriesArr);
    }

    if (prevProps.getStore().idCategoriesArr !== this.idCategoriesArr) {
      console.log("PREV: ", prevProps.getStore().idCategoriesArr);
      this.props.getStore().idCategoriesArr = this.state.idCategoriesArr;
      this.idCategoriesArr = this.state.idCategoriesArr;
      console.log("PREV2: ", this.props.getStore().idCategoriesArr);
      console.log("PREV3: ", this.state.idCategoriesArr);
      console.log("PREV4: ", this.idCategoriesArr);

    }
    if (prevProps.getStore().picture !== this.picture) {
      console.log("PREV PIC: ", prevProps.getStore().picture);
      this.props.getStore().picture = this.state.picture;
      this.picture = this.state.picture;
      console.log("PREV2 PIC: ", this.props.getStore().picture);
      console.log("PREV3 PIC: ", this.state.picture);
      console.log("PREV4 PIC: ", this.picture);

    }

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
      if (this.props.getStore().name !== userInput.name || this.props.getStore().sku !== userInput.sku || this.props.getStore().description !== userInput.description || this.props.getStore().picture !== userInput.picture || this.props.getStore().urlImage !== userInput.urlImage) {
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
    console.log("CATGEORIES IN _VALIDATEDATA", data.idCategoriesArr);
    return {

      nameVal: data.name !== '',
      skuVal: data.sku !== '',
      descriptionVal: data.description !== '',
      categoriesVal: data.idCategoriesArr.length !== 0
      // required: regex w3c uses in html5
    };
  }

  _validationErrors(val) {
    const errMsgs = {

      nameValMsg: val.nameVal ? '' : 'A valid name is required',
      skuValMsg: val.skuVal ? '' : 'A valid SKU is required',
      descriptionValMsg: val.descriptionVal ? '' : 'A valid description is required',
      categoriesValMsg: val.categoriesVal ? '' : 'A valid category is required',

    };
    return errMsgs;
  }

  _grabUserInput() {
    return {

      name: this.name.value,
      sku: this.sku.value,
      description: this.description.value,
      // idCategoriesArr: this.props.getStore().idCategoriesArr,
      idCategoriesArr: this.idCategoriesArr,
      urlImage: this.urlImage.src,
      picture: this.picture ? this.picture : [0]
      // picture: this.picture ? this.picture.target.files[0] : [0]
    };
  }

  newItemBtn() {
    if (this.state.name && this.state.sku && this.state.description && this.state.idCategoriesArr) {
      console.log("PICTURE BTN: ", this.state.picture);
      const { user } = this.state.user;
      // const user = this.props.user.user.uid;
      //If there is no image uploaded
      if (this.state.picture.length === 0) {
        push(refDB(db, 'items/'), {
          name: this.state.name,
          sku: this.state.sku,
          description: this.state.description,
          idImage: "0",
          idCategory: this.state.idCategoriesArr,

          active: true
        });

      } else {
        const storageRef = ref(dbStorage, `/ItemImages/${user}/${this.state.picture.name}`);
        uploadBytes(storageRef, this.state.picture).then(() => {
          // setProcessing(false);
          getDownloadURL(storageRef).then((url) => {

            this.setState({ idImage: { name: "ah", url: "test", extension: "jpg" } });
            // this.setState({ idImage: { name: this.state.idImageTemp.name, url: this.state.idImageTemp.url, extension: "jpg" } });
            console.log(this.state.idImage);
            // setIdImage({ name: idImageTemp.name, url: url, extension: "jpg" });
            console.log(url);
            const pushedFile = push(refDB(db, 'files/'), {
              name: this.state.idImageTemp.name,
              url: url,
              extension: this.state.picture.type,

            });
            const fileKey = pushedFile.key;
            pushedFile.then(() => {


              push(refDB(db, 'items/'), {
                name: this.state.name,
                sku: this.state.sku,
                description: this.state.description,
                idImage: fileKey,
                idCategory: this.state.idCategoriesArr,
                active: true
              });

            });

          })
            .catch((error) => {
              // Handle any errors
              console.log(error);
            });

          // Create a reference to the file to delete
          const deleteRef = ref(dbStorage, `/temp/${user}/`);
          deleteObject(deleteRef);
        });

      }

    }
  }

  optionsCategories() {
    const arrCat = [];
    onValue(refDB(db, "categories/"), snapshot => {
      snapshot.forEach(snap => {
        if (snap.val().active === true) {
          const obj = {

            value: snap.val().name,
            label: snap.val().name,
            color: '#00B8D9',
            key: snap.key
          }

          arrCat.push(obj);
        }



      });

      this.setState({ arrayCategories: arrCat });



    });
    console.log("arrCat:", this.state.arrayCategories);
  }

  addProductImage(imageTemp) {
    if (imageTemp == null || !imageTemp) {
      console.log("file is null");
      return;

    }
    console.log("IMAGE UPLOAD: ", imageTemp);
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(imageTemp.name)) {
      console.log("here2");
      this.setState({ visible: true });
      this.setState({ alertColor: "danger" });
      this.setState({ message: "Error! favor de seleccionar archivos .JPG, .JPEG, .PNG" });
      // this.setState({ picture: [] });
      this.picture = [];
      this.state.picture = [];

      // setProcessing(false);
      return;
    }
    this.picture = imageTemp;
    this.state.picture = imageTemp;
    console.log("PIC: ", this.state.picture);
    console.log("IDIMAGETEMP: ", this.state.idImageTemp);
    const { user } = this.state.user;
    console.log("USER: ", user);
    const storageRef = ref(dbStorage, `/temp/${user}/${imageTemp.name}`);
    uploadBytes(storageRef, imageTemp).then(() => {
      // setProcessing(false);

      getDownloadURL(storageRef).then((url) => {
        this.urlImage = url;
        this.setState({ urlImage: url });
        this.setState({ idImageTemp: { name: imageTemp.name, url: url, extension: "jpg" } });
      })
        .catch((error) => {
          // Handle any errors
          console.log(error);
        });

    });
  }

  async fillIdCategoriesArray(e) {
    const arrCatAux = [];
    for (let i = 0; i < e.length; i++) {
      if (!arrCatAux.includes(e[i].key)) {
        console.log("e value: ", e[i]);
        // const objCategoryData = { label: e[i].label, value: e[i].label };
        const objCategoryData={key:e[i].key,label:e[i].label,value:e[i].label};
        arrCatAux.push(objCategoryData);
        // arrCatAux.push(e[i].key);
      }
    }
    console.log(arrCatAux);
    return arrCatAux;

  }

  render() {

    const style = { width: "450px" };


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
    const notValidClasses = {};

    if (typeof this.state.nameVal === 'undefined' || this.state.nameVal) {
      notValidClasses.nameCls = 'form-control';
    } else {
      notValidClasses.nameCls = 'is-invalid form-control';
      notValidClasses.nameValGrpCls = 'text-danger';
    }
    //For SKU invalid or valid classname
    if (typeof this.state.skuVal === 'undefined' || this.state.skuVal) {
      notValidClasses.skuCls = 'form-control';
    } else {
      notValidClasses.skuCls = 'is-invalid form-control';
      notValidClasses.skuValGrpCls = 'text-danger';
    }
    //For Description invalid or valid classname
    if (typeof this.state.descriptionVal === 'undefined' || this.state.descriptionVal) {
      notValidClasses.descriptionCls = 'form-control';
    } else {
      notValidClasses.descriptionCls = 'is-invalid form-control';
      notValidClasses.descriptionValGrpCls = 'text-danger';
    }
    //For Categories invalid or valid classname
    if (typeof this.state.categoriesVal === 'undefined' || this.state.categoriesVal) {
      notValidClasses.categoriesCls = 'form-control';
    } else {
      notValidClasses.categoriesCls = 'is-invalid form-control';
      notValidClasses.categoriesValGrpCls = 'text-danger';
    }

    return (
      <>
        <div className="step step1 mt-5 ">
          <div className="row justify-content-md-center">
            <div className="col col-lg">
              <div className="">
                {/* <h4>Bienvenido, favor de ingresar todos los campos</h4> */}
                <form id="Form" className="form-horizontal mt-2">
                  <Row>
                    <Alert color={this.state.alertColor} isOpen={this.state.visible}
                      toggle={this.onDismiss.bind(null)}
                    >
                      {this.state.message}
                    </Alert>
                    <Col md="4">
                      <div className="form-group content form-block-holder">
                        <FormGroup>
                          <Label htmlFor="exampleFile">Imagen Artículo</Label>

                          <img id="imageProductRetrieved"
                            alt="..."
                            className=" img-fluid rounded shadow-lg"
                            ref={(f) => {
                              this.urlImage = f;
                            }}
                            src={this.state.picture === "" || this.state.picture[0] === 0 || this.state.picture.length === 0 ? "https://i0.wp.com/zaveriamexico.com/wp-content/uploads/2022/02/04-scaled.jpg?fit=2560%2C1707&ssl=1" : this.state.urlImage}
                            style={style}
                          ></img>


                        </FormGroup>
                        <FormGroup>
                          <input id='fileInput' className='form-control'
                            type="file" placeholder='selecciona archivo'
                            onBlur={this.validationCheck}
                            onChange={(e) => {
                              this.addProductImage(e.target.files[0]);
                            }} />
                        </FormGroup>

                      </div>
                    </Col>
                    <Col>
                      <div className="form-group content form-block-holder">

                        <FormGroup>

                          <Label style={{ width: "135px" }}>Nombre</Label>
                          <input placeholder="Ej. Cartera" type='text' ref={(f) => {
                            this.name = f;
                          }} onChange={this.validationCheck} defaultValue={this.state.name} autoComplete='off'
                            className={notValidClasses.nameCls} required
                          />
                          <div className={notValidClasses.nameValGrpCls}>{this.state.nameValMsg}</div>
                        </FormGroup>

                        <FormGroup>
                          <Label style={{ width: "135px" }}>SKU</Label>
                          <input placeholder="UGG-876-789-02" type='text' ref={(f) => {
                            this.sku = f;
                          }} onChange={this.validationCheck} defaultValue={this.state.sku} autoComplete='off'
                            className={notValidClasses.skuCls} required />
                          <div className={notValidClasses.skuValGrpCls}>{this.state.skuValMsg}</div>
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="exampleFile">Categorías</Label>

                          <Select
                            closeMenuOnSelect={false}
                            className="select"
                            multiple
                            defaultValue={this.state.idCategoriesArr.filter((item) => item.value !== undefined)}
                            isMulti
                            options={this.state.arrayCategories}
                            styles={colourStyles}
                            onBlur={this.validationCheck}
                            onChange={(e) => {
                              this.fillIdCategoriesArray(e).then((arrCat) => {
                                console.log("ARRCAT RETURNED: ", arrCat);
                                this.idCategoriesArr = arrCat;
                                this.state.idCategoriesArr = arrCat;
                                console.log("filling idCategoriesArr: ", this.idCategoriesArr);
                              })
                            }}
                          />
                          <div className={notValidClasses.categoriesValGrpCls}>{this.state.categoriesValMsg}</div>
                        </FormGroup>
                        <FormGroup>
                          <Label style={{ width: "135px" }}>Descripción</Label>
                          <textarea type="textarea" rows="5" ref={(f) => {
                            this.description = f;
                          }} onBlur={this.validationCheck} defaultValue={this.state.description} autoComplete='off'
                            className={notValidClasses.descriptionCls} required />
                          <div className={notValidClasses.descriptionValGrpCls}>{this.state.descriptionValMsg}</div>
                        </FormGroup>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default (Step1);