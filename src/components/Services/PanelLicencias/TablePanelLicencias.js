import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';

const TablePanelLicencias = ({ lista }) => {
  
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Licencias compradas</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Aqui se visualizaran todas las licencias adquiridas
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>ID Licencia</th>
                <th>Plan/Contrato</th>
                <th>Monto</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>Status</th>
                <th>Recurrente</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((tdata) => (
                <tr key={tdata.ID_Licencia} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2 ">

                      <div className="ms-3 ">
                        <Link to={`/servicios/Licencia/${tdata.ID_Licencia}`} className="border border-0 bg-transparent">{tdata.ID_Licencia}</Link>
                        <br/>
                        <span className="text-muted">{tdata.Descripcion}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.Plan}</td>
                  <td>{tdata.Monto}</td>
                  <td>{tdata.Fecha_Inicio}</td>
                  <td>{tdata.Fecha_Inicio}</td>
                  <td>
                    {tdata.status === 'pending' ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === 'holt' ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>{tdata.recurrente}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TablePanelLicencias;
