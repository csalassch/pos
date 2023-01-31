import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useTranslation from '@/hooks/useTranslation';
import Badge from 'react-bootstrap/Badge';
import * as Icon from 'react-feather';


const ExpandedComponentSubsidiaries = () => {
    const { t } = useTranslation();
    const [isSSR, setIsSSR] = useState(true);
    const columns = [
        
        {
            name: t('active_headings'),
            selector: row => row.active,
            width: "3.5rem"
        }
        ,
        
        {
            name: t('name_headings'),
            selector: row => row.name,
            width: "8rem"
        },
        {
            name: "Dirección",
            selector: row => row.address,
            width: "10rem"
        }
        ,
        {
            name: "Staff",
            selector: row => row.staff,
            width: "4.5rem"

        },
        {
            name: "Stock",
            selector: row => row.stock,
            width: "4rem"
        },
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
            

            name: "Tienda Souvenirs",
            address: "Ladera del Cubilete 211, col. La Ladera",
            staff:"15",
            stock:<a href='https://www.freebug.mx/'><Icon.Box /></a>

        },
        {
            id: 2,
            
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            

            name: "Tienda Galindas",
            address: "Ave. Galindas #180, int.1",
            staff:"7",
            stock:<a href='https://www.freebug.mx/'><Icon.Box /></a>

        },
        {
            id: 3,
            
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            

            name: "Restaurante",
            address: "Torres Orvit",
            staff:"5",
            stock:<a href='https://www.freebug.mx/'><Icon.Box /></a>

        }

    ];

    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <div className='container-fluid'>
            {/* <ReactDataTablePagination arrayOfObjects={arrayOfObjects} dataInOnePage={5} /> */}

            {/* {typeof window !=='undefined' ?'trueee':'false mate'} */}
            {!isSSR && <DataTable columns={columns} data={dataSubs}/>}
        </div>

    );
};
export default ExpandedComponentSubsidiaries;