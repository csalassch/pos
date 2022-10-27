import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

const TopCardsData = ({ bg, img, subtitle, title }) => {
  return (
    <Card className={`bg-${bg}`}>
      <CardBody>
        <div className="d-flex align-items-center">
          <img src={img} alt="income" />
          <div className="ms-3">
            <h6 className="text-dark-white mt-2 mb-0">{subtitle}</h6>
            <h2 className="text-dark-white">{title}</h2>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
TopCardsData.propTypes = {
  bg: PropTypes.string,
  img: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
export default TopCardsData;
