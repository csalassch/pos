import { Button, Card, CardBody } from 'reactstrap';

const Twitter = () => {
  return (
    <Card className="bg-info">
      <CardBody>
        <div className="d-flex">
          <div className="stats">
            <h1 className="text-dark-white">3,257+</h1>
            <h6 className="text-dark-white mb-0">Twitter Followers</h6>
            <Button color='light' className="rounded-pill mt-3">Check list</Button>
          </div>
          <div className="ms-auto">
            <i className="bi bi-twitter display-5 op-3 text-dark"></i>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Twitter;
