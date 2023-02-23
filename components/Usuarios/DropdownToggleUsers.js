
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ListGroup, ListGroupItem
} from 'reactstrap';
import * as Icon from 'react-feather';
import SimpleBar from 'simplebar-react';


const DropdownToggleUsers = ({openEdit,setOpenEdit,indexEdit, setIndexEdit,indexEditUsers,setIndexEditUsers}) => {

    return (
        <UncontrolledDropdown direction='left' className="mx-1 ">
            <DropdownToggle className="p-1 border-0 btn-header">
                <Icon.MoreVertical size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
                <SimpleBar style={{ maxHeight: '350px' }}>
                    <ListGroup flush>
                        <ListGroupItem style={{ border: "0" }} action tag="a">
                            <div className="d-flex align-items-center gap-3">

                                <div className="col-9">
                                    <span onClick={()=>{
                                        setOpenEdit(!openEdit);
                                        setIndexEdit(indexEdit);
                                        setIndexEditUsers(indexEditUsers);
                                        console.log("Indice a editar: ",indexEdit);
                                        console.log("Indice a editar en usuarios: ",indexEditUsers);
                                        }} className="d-block"><Icon.Edit2 size={14} /> Editar</span>

                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem style={{ border: "0" }} action tag="a">
                            <div className="d-flex align-items-center gap-3">

                                <div className="col-9">
                                    <span className="d-block"><Icon.Lock size={14} /> Asignar permisos</span>

                                </div>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </SimpleBar>
                <DropdownItem divider />
                <div className="p-1 px-3">
                    <span><Icon.XSquare size={14} /> Desactivar
                    </span>
                </div>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};
export default DropdownToggleUsers;