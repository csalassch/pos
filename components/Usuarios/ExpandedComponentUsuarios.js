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
            name: "Estado",
            selector: row => row.active,
            minWidth: "8rem",
            maxWidth: "8em"
        },
        {
            name: "Id",
            selector: row => row.idInterno,
            minWidth: "4rem",
            maxWidth: "4em"
        }
        ,
        {
            name: t('txt_008'),
            selector: row => row.name,
        }
        ,
        {
            name: "Correo",
            selector: row => row.email,

        },
        {
            name: "Fecha de registro",
            selector: row => row.creationDate,

        },
        {
            name:"Roles",
            selector: row => row.roles,
            minWidth: "8rem",
            maxWidth: "8em"
        }
    ];

    const dataSubs = [
        {
            id: 1,
            idInterno: "A112",
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            name: "Heyde Tirado Osuna",
            email: "heyde.tirado@vrt.com",
            creationDate: "20/12/2022",
            roles: "Cajero, administrador"
        },
        {
            id: 2,
            idInterno: "A113",
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            name: "Heyde Tirado Osuna",
            email: "heyde.tirado@vrt.com",
            creationDate: "20/12/2022",
            roles: "Cajero"
        }

    ];

    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <div className='container-fluid'>
            {/* <ReactDataTablePagination arrayOfObjects={arrayOfObjects} dataInOnePage={5} /> */}

            {/* {typeof window !=='undefined' ?'trueee':'false mate'} */}
            {!isSSR && <div style={{marginLeft:"35px"}} id="usersComp"><DataTable columns={columns} data={dataSubs} /></div>}
        </div>

    );
};
export default ExpandedComponentUsuarios;