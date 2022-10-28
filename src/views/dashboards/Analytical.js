import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import TopCards from '../../components/dashboard/analytical/TopCards';
import SalesOverview from '../../components/dashboard/analytical/SalesOverview';
import VisitSeparation from '../../components/dashboard/analytical/VisitSeparation';
import Blog from '../../components/dashboard/analytical/Blog';
import WebsiteVisit from '../../components/dashboard/analytical/WebsiteVisit';
import ProjectMonth from '../../components/dashboard/analytical/ProjectMonth';
import Activity from '../../components/dashboard/analytical/Activity';
import Twitter from '../../components/dashboard/analytical/Twitter';
import Facebook from '../../components/dashboard/analytical/Facebook';
import Gmail from '../../components/dashboard/analytical/Gmail';
import TaskList from '../../components/dashboard/analytical/TaskList';
import ProfileCard from '../../components/dashboard/analytical/ProfileCard';
import MyContact from '../../components/dashboard/analytical/MyContact';
import Feeds from '../../components/dashboard/analytical/Feeds';
import RecentComments from '../../components/dashboard/analytical/RecentComments';
import RecentChat from '../../components/dashboard/analytical/RecentChat';

const Analytical = () => {
  
  return (
    <>
      <BreadCrumbs />
      <TopCards />
      <Row>
        <Col lg="9">
          <SalesOverview />
        </Col>
        <Col lg="3">
          <VisitSeparation />
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
        <Col lg="4">
          <Blog />
        </Col>
        <Col lg="8">
          <WebsiteVisit />
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <Twitter />
        </Col>
        <Col lg="4">
          <Facebook />
        </Col>
        <Col lg="4">
          <Gmail />
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <TaskList />
        </Col>
        <Col lg="6">
          <ProfileCard />
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <MyContact />
        </Col>
        <Col lg="6">
          <Feeds />
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

export default Analytical;
