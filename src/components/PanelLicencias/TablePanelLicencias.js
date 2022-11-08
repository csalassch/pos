import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';

const TablePanelLicencias = () => {
  const [lista, setLista] = useState([]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * (max));
  }

  function getDatosLicencia() {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      const caracteristicas = [];
      const numCarac = getRandomInt(4);
      for (let j = 0; j < numCarac; j++) {
        caracteristicas.push(`Caracteristica ${j + 1}`)
      }
      const licencia = {
        id: i,
        nombre: `Licencia ${i + 1}`,
        descripcion: `Descripcion ${i + 1}`,
        monto: (i + 1) * 100,
        caracteristicas: caracteristicas
      }

      arr.push(licencia)
    }
    setLista(arr);
  }
  const listItems =(datos)=> datos.map((carac) =>
    <li key={carac.id}>
      {carac}
    </li>
  );
  useEffect(() => {
    getDatosLicencia();
  }, [])
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Lista de licencias </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Aqui se visualizaran todas las licencias adquiridas
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Monto</th>
                <th>Caracteristicas</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((tdata) => (
                <tr key={tdata.id} className="border-top">
                  <td>{tdata.nombre}</td>
                  <td>{tdata.descripcion}</td>
                  <td>{tdata.monto}</td>
                  <td>
                    <ul>{listItems(tdata.caracteristicas)}</ul>
                  </td>
                  <td>
                    <div className="d-flex align-items-center p-2 ">
                      <div className="ms-3 ">
                        <Link to={`/servicios/PanelLicencias/Licencia/${tdata.id}`} className="border border-0 bg-transparent">Editar</Link>
                      </div>
                    </div>
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

export default TablePanelLicencias;
