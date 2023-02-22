
import SubsidiariesComp from "@/components/Ubicaciones/SubsidiariesComp";
import { withPublic } from "@/hooks/route";
import BreadCrumbs from "@/layouts/breadcrumbs/BreadCrumbs";

const subsidiarias = () => {

    return (
        <div>
            <BreadCrumbs />
            <SubsidiariesComp></SubsidiariesComp>
        </div>
    );
};
export default withPublic(subsidiarias);