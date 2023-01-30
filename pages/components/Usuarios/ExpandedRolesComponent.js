import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useTranslation from '../../hooks/useTranslation';
import Badge from 'react-bootstrap/Badge';
import * as Icon from 'react-feather';
import { Col, Row } from 'reactstrap';


const ExpandedRolesComponent = () => {
    const { t } = useTranslation();
    const [isSSR, setIsSSR] = useState(true);
    const columns = [
        {

            name: "",
            selector: row => row.active,
            width: "2rem"
        }
        ,

        {
            name: "Permiso",
            selector: row => row.name,
            width: "18rem"
        }


    ];

    const dataSubs = [
        {
            id: 1,

            active:
                <Icon.Check className='checkRoles' />
            ,
            name: "Dar de alta usuarios"
        },
        {
            id: 3,

            active:
                <Icon.Check className='checkRoles' />
            ,
            name: "Editar usuarios"
        },
        {
            id: 4,

            active:
                <Icon.Check className='checkRoles' />
            ,
            name: "Desactivar usuarios"
        },
        {
            id: 2,

            active:
                <Icon.Check className='checkRoles' />
            ,
            name: "Leer"
        },

    ];

    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <div className='container-fluid'>
            {/* <ReactDataTablePagination arrayOfObjects={arrayOfObjects} dataInOnePage={5} /> */}

            {/* {typeof window !=='undefined' ?'trueee':'false mate'} */}
            {!isSSR && <div className='d-flex justify-content-center align-items-center'><Row><Col><DataTable columns={columns} data={dataSubs} dense style={{backgroundColor:"red"}} /></Col></Row></div>}
        </div>

    );
};
export default ExpandedRolesComponent;