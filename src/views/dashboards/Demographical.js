import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import TopCards from '../../components/dashboard/demographical/TopCards';
import SalesOverview from '../../components/dashboard/analytical/SalesOverview';
import VisitSeparation from '../../components/dashboard/analytical/VisitSeparation';
import Blog2 from '../../components/dashboard/demographical/Blog2';
import WebsiteVisit from '../../components/dashboard/analytical/WebsiteVisit';
import ProjectMonth from '../../components/dashboard/analytical/ProjectMonth';
import Activity from '../../components/dashboard/analytical/Activity';
import Twitter from '../../components/dashboard/analytical/Twitter';
import Facebook from '../../components/dashboard/analytical/Facebook';
import Gmail from '../../components/dashboard/analytical/Gmail';
import RecentComments from '../../components/dashboard/analytical/RecentComments';
import RecentChat from '../../components/dashboard/analytical/RecentChat';

const Demographical = () => {
  return (
    <>
      <BreadCrumbs />
      <TopCards />
      <Row>
        <Col lg="6">
          <SalesOverview />
        </Col>
        <Col lg="3">
          <Blog2 />
        </Col>
        <Col lg="3">
          <VisitSeparation />
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <Gmail />          
          <Facebook />
          <Twitter />
        </Col>
        <Col lg="8">
          <WebsiteVisit />
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <ProjectMonth />
        </Col>
        <Col lg="6">
          <Activity />
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <RecentComments />
        </Col>
        <Col lg="6">
          <RecentChat />
        </Col>
      </Row>
    </>
  );
};

export default Demographical;
