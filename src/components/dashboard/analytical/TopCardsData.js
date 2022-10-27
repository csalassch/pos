import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

const TopCardsData = ({ img, subtitle, title }) => {
  return (
    <Card>
      <span className="lstick bg-info top-card"></span>
      <CardBody>
        <div className="d-flex align-items-center">
          <img src={img} alt="income" />
          <div className="ms-3">
            <h6 className="text-muted mt-2 mb-0">{subtitle}</h6>
            <h2 className="mt-0 ">{title}</h2>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

TopCardsData.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  subtitle: PropTypes.string,
};

export default TopCardsData;
