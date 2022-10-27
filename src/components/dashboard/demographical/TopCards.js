import { Row, Col } from 'reactstrap';

import TopCardsData from './TopCardsData';
import icon1 from '../../../assets/images/icons/income-w.png';
import icon2 from '../../../assets/images/icons/expense-w.png';
import icon3 from '../../../assets/images/icons/assets-w.png';
import icon4 from '../../../assets/images/icons/staff-w.png';

const TopCards = () => {
  return (
    <Row>
      <Col sm="6" lg="3">
        <TopCardsData bg="info" img={icon1} title="2,064" subtitle="Total Income" />
      </Col>
      <Col sm="6" lg="3">
        <TopCardsData bg="success" img={icon2} title="1,738" subtitle="Total Expense" />
      </Col>
      <Col sm="6" lg="3">
        <TopCardsData bg="primary" img={icon3} title="5,963" subtitle="Total Assets" />
      </Col>
      <Col sm="6" lg="3">
        <TopCardsData bg="danger" img={icon4} title="4,464" subtitle="Total Staff" />
      </Col>
    </Row>
  );
};

export default TopCards;
