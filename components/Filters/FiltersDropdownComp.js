import { ListGroup, ListGroupItem } from 'reactstrap';

const FiltersDropdownComp = ({filters}) => {
    return (
        <div>
            <ListGroup flush>
                {filters.map((msg) => (
                    <ListGroupItem style={{ border: "0" }} action key={msg.id} tag="a" href="/">
                        <div className="d-flex align-items-center gap-3">

                            <div className="col-9">
                                <span className="d-block">{msg.filterType}</span>
                                {
                                    msg.filterChildren.map((child)=>{
                                        return (

                                            <div>&nbsp; &nbsp; &nbsp;<small>{child}</small></div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
};

export default FiltersDropdownComp;
