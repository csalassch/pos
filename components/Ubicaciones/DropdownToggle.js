
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import * as Icon from 'react-feather';
import SimpleBar from 'simplebar-react';
import FiltersDropdown from './FiltersDropdown';


const DropdownToggleMatriz = () => {

    return (
        <UncontrolledDropdown direction='down' className="mx-1 ">
                    <DropdownToggle className="p-1 border-0 btn-header">
                        <Icon.MoreVertical size={18} />
                    </DropdownToggle>
                    <DropdownMenu className="ddWidth">
                        <SimpleBar style={{ maxHeight: '350px' }}>
                            <FiltersDropdown />
                        </SimpleBar>
                        <DropdownItem divider />
                        <div className="p-1 px-3">
                            Filtros Avanzados
                        </div>
                    </DropdownMenu>
                </UncontrolledDropdown>
    );
};
export default DropdownToggleMatriz;