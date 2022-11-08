import { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';

const TableUsuariosLicencias = () => {
  const [lista, setLista] = useState([]);
  
  function getDatosTableLicences(){
    const arr=[];
    for (let i = 0; i < 5; i++) {
      const obj = {
        id: i,
        cliente: `Chencho ${i+1}`,
        licencia: `Licencia ${i+1}`,
        vigencia:(new Date().toString()),
        activo: 'false'
      }
      arr.push(obj);
    }
    setLista(arr);
  }

  useEffect(()=>{
    getDatosTableLicences();
  },[])
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Lista de Usuarios con licencias </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Aqui se visualizaran todas las licencias adquiridas
          </CardSubtitle>

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
        </CardBody>
      </Card>
    </div>
  );
};

export default TableUsuariosLicencias;
