import BreadCrumbs from "@/layouts/breadcrumbs/BreadCrumbs";
import PermisosComp from "@/components/Usuarios/PermisosComp";
import { withPublic } from "@/hooks/route";

const Permisos = () => {

    return (
        <div>
            <BreadCrumbs />
            <PermisosComp/>
        </div>
    );
};
export default withPublic(Permisos);