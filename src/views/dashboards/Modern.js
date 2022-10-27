import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import TopCards from '../../components/dashboard/analytical/TopCards';
import ProjectMonth from '../../components/dashboard/analytical/ProjectMonth';
import Activity from '../../components/dashboard/analytical/Activity';
import BrowseStats from '../../components/dashboard/modern/BrowseStats';
import TotalVisits from '../../components/dashboard/modern/TotalVisits';
import ProductSales from '../../components/dashboard/modern/ProductSales';
import Sales from '../../components/dashboard/modern/Sales';

const Modern = () => {
  return (
    <>
      <BreadCrumbs />
      <TopCards />
      <Row>
        <Col lg="6">
            <Sales />
        </Col>
        <Col lg="6">
            <ProductSales />
        </Col>
      </Row>
      <Row>
        <Col lg="8">
            <TotalVisits />
        </Col>
        <Col lg="4">
            <BrowseStats />
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
    </>
  );
};

export default Modern;
