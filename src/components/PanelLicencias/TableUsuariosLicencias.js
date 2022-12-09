import { useState, useEffect } from 'react';
import { Card, CardHeader, Table, Row, Col, CardBody } from 'reactstrap';

const TableUsuariosLicencias = () => {
  const [lista, setLista] = useState([]);

  function getDatosTableLicences() {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      const obj = {
        id: i,
        cliente: `Cliente ${i + 1}`,
        licencia: `Licencia ${i + 1}`,
        vigencia: (new Date().toUTCString()),
        activo: 'false'
      }
      arr.push(obj);
    }
    setLista(arr);
  }

  useEffect(() => {
    getDatosTableLicences();
  }, [])
  return (
    <div>
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <h4 style={{ color: "#eef0f2" }}>Lista de clientes</h4>
            </Col>
            <Col>
              <div className='d-flex justify-content-end'>
              </div >
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Licencia</th>
                    <th>Vigencia</th>
                    <th>Activo</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((tdata) => (
                    <tr key={tdata.id} className="border-top">
                      <td>
                        <div className="d-flex align-items-center p-2 ">

                          <div className="ms-3 ">
                            <span className="text-muted">{tdata.cliente}</span>
                          </div>
                        </div>
                      </td>
                      <td>{tdata.licencia}</td>
                      <td>{tdata.vigencia}</td>
                      <td>
                        {tdata.activo === 'false' ? (
                          <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                        ) : (
                          <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div >
  );
};

export default TableUsuariosLicencias;
