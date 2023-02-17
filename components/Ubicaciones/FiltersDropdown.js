import { ListGroup, ListGroupItem } from 'reactstrap';
import { User, Link, Calendar, Settings } from 'react-feather';

const filters = [
  {
    id: 1,
    filterType: 'Estado',
    filterChildren: 'Activos',
  },
  {
    id: 2,
    filterType: 'Ciudad',
    filterChildren: 'Hermosillo',
  },
  {
    id: 3,
    filterType: 'Estado',
    filterChildren: 'Baja California',
  },
  {
    id: 4,
    filterType: 'Más filtros',
    filterChildren: 'Matriz',
  },
];

const FiltersDropdown = () => {
  return (
    <div>
      <ListGroup flush>
        {filters.map((msg) => (
          <ListGroupItem style={{border:"0"}} action key={msg.id} tag="a" href="/">
            <div className="d-flex align-items-center gap-3">

              <div className="col-9">
                <span className="d-block">{msg.filterType}</span>
                &nbsp; &nbsp; &nbsp;<small>{msg.filterChildren}</small>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default FiltersDropdown;
