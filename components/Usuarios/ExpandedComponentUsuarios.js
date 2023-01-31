import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useTranslation from '@/hooks/useTranslation';
import Badge from 'react-bootstrap/Badge';
import * as Icon from 'react-feather';
import { Col, Row } from 'reactstrap';


const ExpandedComponentUsuarios = () => {
    const { t } = useTranslation();
    const [isSSR, setIsSSR] = useState(true);
    const columns = [
        {

            name: t('active_headings'),
            selector: row => row.active,
            width: "14rem"
            
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
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            name: "Dar de alta usuarios"
        },
        {
            id: 3,

            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            name: "Editar usuarios"
        },
        {
            id: 4,

            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            name: "Desactivar usuarios"
        },
        {
            id: 2,

            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
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
            {!isSSR && <div className='d-flex justify-content-center align-items-center'><Row><Col><DataTable columns={columns} data={dataSubs} /></Col></Row></div>}
        </div>

    );
};
export default ExpandedComponentUsuarios;