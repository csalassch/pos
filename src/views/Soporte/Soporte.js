import { useEffect, useState } from "react";
import * as Icon from 'react-feather';
import BreadCrumbs from "../../layouts/breadcrumbs/BreadCrumbs";
import Alta from "../../components/Soporte/Alta";


const Soporte = () => {
    const [addPersonalShow, setAddPersonalShow] = useState(0);
    useEffect(() => {

    }, [addPersonalShow])
    return (
        <>
            <BreadCrumbs />
            <div className="w-full d-flex align-items-center" style={{ background: "white" }} onClick={() => {
                if (addPersonalShow === 0) { setAddPersonalShow(1) } else { setAddPersonalShow(0) }
            }}>
                {addPersonalShow === 1 ? <div  className="w-full d-flex align-items-center m-4"><Icon.ChevronDown /></div> :
                    <div className="w-full d-flex align-items-center m-4"><Icon.ChevronRight /> <h4 className='m-2'>Agregue una entidad</h4></div>}
            </div>
            {addPersonalShow === 1 ? <div><Alta /></div> :<div></div>}
        </>
    );
};

export default Soporte;
