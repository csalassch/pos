import { Button, Card, CardBody } from 'reactstrap';

const LicenciaDescripcion = () => {
  return (
    <Card className="bg-primary">
      <CardBody>
        <div className="d-flex">
          <div className="stats">
            <h1 className="text-dark-white">6,509+</h1>
            <h6 className="text-dark-white mb-0">Licencia N+1</h6>
            <Button color='light' className="rounded-pill mt-3">Ver informacion</Button>
          </div>
          <div className="ms-auto">
            <i className="bi bi-LicenciaDescripcion display-5 op-3 text-dark"></i>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default LicenciaDescripcion;
