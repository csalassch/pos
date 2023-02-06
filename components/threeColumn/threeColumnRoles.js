import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Select from 'react-select';
import SimpleBar from 'simplebar-react';
import CatalogoPermisos from '../Usuarios/catalogoPermisos';
import * as Icon from 'react-feather';

const ThreeColumnRoles = ({ids}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isEditClick, setIsEditClick] = React.useState(true);
    const [isOpenMenu, setIsOpenMenu] = React.useState({ items: true, sales: false, purchases: false, suppliers: false, admin: false });
    const [editTxt, setEditTxt] = React.useState("Mi información");
    const [permitsToApply, setPermitsToApply] = React.useState([{ value: "", id: "" }]);
    const listPermitsToApply = [];

    const handleSubmit = () => {
        setIsOpen(!isOpen);
    };

    const active = useSelector((state) => state.contactsReducer.currentFilter);
    const [modal, setModal] = React.useState(false);
    const [checkOutput, setCheckOutput] = React.useState({});
    const [flagBtn, setFlagBtn] = React.useState(false);
    const [flagBtnRemove, setFlagBtnRemove] = React.useState(false);

    const toggle = () => {
        setModal(!modal);
    };
    function insertPermit(value, id) {
        console.log(permitsToApply);
        if (permitsToApply.some(e => e.id === id) === false) {

            permitsToApply.push({ value: value, id: id });
            
        } else {
            const newPermits = permitsToApply.filter(permit => permit.id !== id);
            setPermitsToApply(newPermits);
            console.log("Spliced: ", permitsToApply);
        }
    }

    useEffect(() => {
        if (isOpenMenu.items === true) {
            var element = document.getElementById("sales");
            element.style.display = "none";
            var element2 = document.getElementById("items");
            element2.style.display = "block";
            var element3 = document.getElementById("purchases");
            element3.style.display = "none";
            var element4 = document.getElementById("suppliers");
            element4.style.display = "none";
            var element5 = document.getElementById("admin");
            element5.style.display = "none";
        }
        if (isOpenMenu.sales === true) {
            var element = document.getElementById("items");
            element.style.display = "none";
            var element2 = document.getElementById("sales");
            element2.style.display = "block";
            var element3 = document.getElementById("purchases");
            element3.style.display = "none";
            var element4 = document.getElementById("suppliers");
            element4.style.display = "none";
            var element5 = document.getElementById("admin");
            element5.style.display = "none";
        }
        if (isOpenMenu.purchases === true) {
            var element = document.getElementById("purchases");
            element.style.display = "block";
            var element2 = document.getElementById("sales");
            element2.style.display = "none";
            var element3 = document.getElementById("items");
            element3.style.display = "none";
            var element4 = document.getElementById("suppliers");
            element4.style.display = "none";
            var element5 = document.getElementById("admin");
            element5.style.display = "none";
        }
        if (isOpenMenu.suppliers === true) {
            var element = document.getElementById("purchases");
            element.style.display = "none";
            var element2 = document.getElementById("sales");
            element2.style.display = "none";
            var element3 = document.getElementById("items");
            element3.style.display = "none";
            var element4 = document.getElementById("suppliers");
            element4.style.display = "block";
            var element5 = document.getElementById("admin");
            element5.style.display = "none";
        }
        if (isOpenMenu.admin === true) {
            var element = document.getElementById("purchases");
            element.style.display = "none";
            var element2 = document.getElementById("sales");
            element2.style.display = "none";
            var element3 = document.getElementById("items");
            element3.style.display = "none";
            var element4 = document.getElementById("suppliers");
            element4.style.display = "none";
            var element5 = document.getElementById("admin");
            element5.style.display = "block";
        }

        console.log("permits: ", permitsToApply);
        console.log("checkout: ", checkOutput);
        if (flagBtn === true) {
            insertPermit(checkOutput.value, checkOutput.id);
            setFlagBtn(false);
        }
        if (flagBtnRemove === true) {
            insertPermit(checkOutput.value, checkOutput.id);
            setFlagBtnRemove(false);
        }
        if(ids.length!==0){
            console.log("IDS: ",ids[0].permiso);
            permitsToApply.push({ value:ids[0].permiso, id: ids[0].id });

        }

    }, [isOpenMenu, checkOutput, permitsToApply])

    return (
        <div className="d-lg-flex d-md-block border position-relative leftRightBox threeColumn">
            <div className={`leftPart flex-shrink-0 border-end ${isOpen ? 'showLeftPart' : ''}`}>

                <SimpleBar style={{ height: 'calc(100vh - 200px)' }}>
                    <ListGroup className='pb-4' flush>
                        <h6 className="px-3 pt-3">Permisos </h6>
                        <ListGroupItem
                            tag="a"
                            className={active === 'show_all' ? ' py-3 border-0 listPermitsRole' : 'py-3 border-0 listPermitsRole'}
                            onClick={() => setIsOpenMenu({ items: true, sales: false, purchases: false, suppliers:false,admin:false })}
                        >
                            <i className="bi bi-box-seam mx-1" />Artículos
                        </ListGroupItem>
                        <ListGroupItem
                            tag="a"
                            className=' py-3 border-0 listPermitsRole'
                            onClick={() => setIsOpenMenu({ items: false, sales: true, purchases: false, suppliers:false,admin:false })}
                        >
                            <i className="bi bi-receipt mx-1" /> Ventas
                        </ListGroupItem>
                        <ListGroupItem
                            tag="a"
                            className='py-3 border-0 listPermitsRole'
                            onClick={() => setIsOpenMenu({ items: false, sales: false, purchases: true, suppliers:false,admin:false })}

                        >
                            <i className="bi bi-cart mx-1"></i> Compras
                        </ListGroupItem>
                        <ListGroupItem
                            tag="a"
                            className='py-3 border-0 listPermitsRole'
                            onClick={() => setIsOpenMenu({ items: false, sales: false, purchases: false, suppliers:true,admin:false })}

                        >
                            <i className="bi bi-shop-window mx-1"></i> Proveedores
                        </ListGroupItem>
                        <ListGroupItem
                            tag="a"
                            className='py-3 border-0 mb-3 listPermitsRole'
                            onClick={() => setIsOpenMenu({ items: false, sales: false, purchases: false, suppliers:false,admin:true })}

                        >
                            <i className="bi bi-person-badge mx-1"></i> Administrativo
                        </ListGroupItem>
                    </ListGroup>
                </SimpleBar>
            </div>
            <div className="middlePart flex-shrink-0">
                <div id='items' className='mt-4'>
                    <div className='container-fluid p-0'>
                        {CatalogoPermisos.filter(permit => permit.tipo === "Artículos").map((permit) => {
                            return (

                                <Row key={permit.id}>
                                    <Col>
                                        <div className="form-check d-flex flex-row">
                                            <input style={{ marginRight: "5px" }} className="form-check-input" type="checkbox"
                                                value={permit.permiso} id={permit.id}
                                                onChange={(e) => {
                                                    setCheckOutput({ value: e.target.value, id: e.target.id });

                                                    if (e.target.checked === true) {
                                                        console.log("Got here to push");
                                                        setFlagBtn(true);
                                                        console.log("Checks in assign: ", checkOutput);


                                                    } else {
                                                        setFlagBtnRemove(true);
                                                    }

                                                }} />
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{permit.permiso}</Label>
                                        </div>
                                    </Col>

                                </Row>
                            );
                        })}



                    </div>
                </div>
                <div id='sales' className='mt-4'>
                    <div className='container-fluid p-0'>
                        {CatalogoPermisos.filter(permit => permit.tipo === "Ventas").map((permit) => {
                            return (

                                <Row key={permit.id}>
                                    <Col>
                                        <div className="form-check d-flex flex-row">
                                            <input style={{ marginRight: "5px" }} className="form-check-input" type="checkbox" value={permit.permiso} id={permit.id}
                                                onChange={(e) => {
                                                    setCheckOutput({ value: e.target.value, id: e.target.id });

                                                    if (e.target.checked === true) {
                                                        console.log("Got here to push");
                                                        setFlagBtn(true);
                                                        console.log("Checks in assign: ", checkOutput);


                                                    } else {
                                                        setFlagBtnRemove(true);
                                                    }

                                                }}/>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{permit.permiso}</Label>
                                        </div>
                                    </Col>

                                </Row>
                            );
                        })}



                    </div>
                </div>
                <div id='purchases' className='mt-4'>
                    <div className='container-fluid p-0'>
                        {CatalogoPermisos.filter(permit => permit.tipo === "Compras").map((permit) => {
                            return (

                                <Row key={permit.id}>
                                    <Col>
                                        <div className="form-check d-flex flex-row">
                                            <input style={{ marginRight: "5px" }} className="form-check-input" type="checkbox" value={permit.permiso} id={permit.id}
                                                onChange={(e) => {
                                                    setCheckOutput({ value: e.target.value, id: e.target.id });

                                                    if (e.target.checked === true) {
                                                        console.log("Got here to push");
                                                        setFlagBtn(true);
                                                        console.log("Checks in assign: ", checkOutput);


                                                    } else {
                                                        setFlagBtnRemove(true);
                                                    }

                                                }}/>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{permit.permiso}</Label>
                                        </div>
                                    </Col>

                                </Row>
                            );
                        })}



                    </div>
                </div>
                <div id='suppliers' className='mt-4'>
                    <div className='container-fluid p-0'>
                        {CatalogoPermisos.filter(permit => permit.tipo === "Proveedores").map((permit) => {
                            return (

                                <Row key={permit.id}>
                                    <Col>
                                        <div className="form-check d-flex flex-row">
                                            <input style={{paddingRight:"5px"}} className="form-check-input" type="checkbox" value={permit.permiso} id={permit.id}
                                                onChange={(e) => {
                                                    setCheckOutput({ value: e.target.value, id: e.target.id });

                                                    if (e.target.checked === true) {
                                                        console.log("Got here to push");
                                                        setFlagBtn(true);
                                                        console.log("Checks in assign: ", checkOutput);


                                                    } else {
                                                        setFlagBtnRemove(true);
                                                    }

                                                }}/>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{permit.permiso}</Label>
                                        </div>
                                    </Col>

                                </Row>
                            );
                        })}



                    </div>
                </div>
                <div id='admin' className='mt-4'>
                    <div className='container-fluid p-0'>
                        {CatalogoPermisos.filter(permit => permit.tipo === "Administrativo").map((permit) => {
                            return (

                                <Row key={permit.id}>
                                    <Col>
                                        <div className="form-check d-flex flex-row">
                                            <input className="form-check-input" type="checkbox" value={permit.permiso} id={permit.id}
                                                onChange={(e) => {
                                                    setCheckOutput({ value: e.target.value, id: e.target.id });

                                                    if (e.target.checked === true) {
                                                        console.log("Got here to push");
                                                        setFlagBtn(true);
                                                        console.log("Checks in assign: ", checkOutput);


                                                    } else {
                                                        setFlagBtnRemove(true);
                                                    }

                                                }}/>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400",marginLeft:"5px" }}>{permit.permiso}</Label>
                                        </div>
                                    </Col>

                                </Row>
                            );
                        })}



                    </div>
                </div>


            </div>
            <div className="rightPart showRightPart">
                <h6 className="px-3 pt-3">Permisos a aplicar </h6>
                <div className='container-fluid'>

                    {permitsToApply.map((apply) => {
                        return (
                            apply.id!==''?
                            <div><Icon.CheckCircle style={{ verticalAlign: "middle", position: "relative", width: "15px",color:"#077cab" }}/> {apply.value}</div>:''
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

ThreeColumnRoles.propTypes = {
    leftContent: PropTypes.node,
    rightContent: PropTypes.node,
};

export default ThreeColumnRoles;