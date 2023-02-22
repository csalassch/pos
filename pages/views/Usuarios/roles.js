import BreadCrumbs from "@/layouts/breadcrumbs/BreadCrumbs";
import RolesComp from "@/components/Usuarios/RolesComp";
import { withPublic } from "@/hooks/route";

const Roles = () => {

    return (
        <div>
            <BreadCrumbs />
            <RolesComp/>
        </div>
    );
};
export default withPublic(Roles);