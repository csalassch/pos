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
            <div className="w-full d-flex align-items-center" style={{ background: "white" }} onClick={() => { if (addPersonalShow === 0) { setAddPersonalShow(1) } else { setAddPersonalShow(0) } }}>
                {addPersonalShow === 1 ? <div><Icon.ChevronRight /></div> :
                    <div><Icon.ChevronDown /></div>}
            </div>
            {addPersonalShow === 1 ? <div><Alta /></div> :
                <div></div>}
        </>
    );
};

export default Soporte;
