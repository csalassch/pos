import { Button, Card, CardBody } from 'reactstrap';

const Gmail = () => {
  return (
    <Card className="bg-success">
      <CardBody>
        <div className="d-flex">
          <div className="stats">
            <h1 className="text-dark-white">9,062+</h1>
            <h6 className="text-dark-white mb-0">Subscribe</h6>
            <Button color='light' className="rounded-pill mt-3">Check list</Button>
          </div>
          <div className="ms-auto">
            <i className="bi bi-envelope display-5 op-3 text-dark"></i>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Gmail;
