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
            name: t('txt_017'),
            selector: row => row.active,
            minWidth:"5rem",
            maxWidth:"5em"
        }
        ,
        
        {
            name: t('txt_008'),
            selector: row => row.name,
            maxWidth:"20em"
        },
        {
            name: t('txt_105'),
            selector: row => row.address,
            maxWidth:"20em"
        }
        ,
        {
            name: "Ciudad,Estado",
            selector: row => row.cityState,
            maxWidth:"10em",


        },
        {
            name: " ",
            selector: row => row.options,
            minWidth:"3rem",
            maxWidth:"3em",


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
            name: "VRT Mxl",
            cityState:"Mexicali,Baja California",
            options:<div style={{cursor:"pointer"}}><Icon.MoreVertical size={17}/></div>            
        },
        {
            id: 2,
            active:
            <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            name: "VRT calle11",
            address: "Calle 11 S/N local 12 C.P 21180",
            cityState:"Mexicali,Baja California",
            options:<div style={{cursor:"pointer"}}><Icon.MoreVertical size={17}/></div>
            
        },
        {
            id: 3,
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            name: "VRT SLRC",
            cityState:"San Luis Rio Colorado, Sonora",
            options:<div style={{cursor:"pointer"}}><Icon.MoreVertical size={17}/></div>

        },
        {
            id: 4,
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            name: "VRT Hermosillo",
            address:"Blv. 2000 #500 Villafontana C.P. 21987",
            cityState:"Hermosillo, Sonora",
            options:<div style={{cursor:"pointer"}}><Icon.MoreVertical size={17}/></div>

        },
        

    ];

    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <div className='container-fluid'>
            {!isSSR && <DataTable columns={columns} data={dataSubs}/>}
        </div>

    );
};
export default ExpandedComponentSubsidiaries;