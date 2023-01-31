import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, ListGroupItem ,Button} from 'reactstrap';
import { setVisibilityFilter } from '@/store/apps/contacts/ContactSlice';

const LeftMenu = () => {
    const dispatch = useDispatch();
    const active = useSelector((state) => state.contactsReducer.currentFilter);
    const [modal, setModal] = React.useState(false);

    const toggle = () => {
        setModal(!modal);
    };
    return (
        <div>
            <div className="p-3 border-bottom">
                <Button color="danger" block onClick={toggle}>
                    Add New Contact
                </Button>
            </div>
            <ListGroup className='pb-4' flush>
                <h6 className="px-3 pt-3">Filter </h6>
                <ListGroupItem
                    href="#"
                    tag="a"
                    className={active === 'show_all' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
                    onClick={() => dispatch(setVisibilityFilter('show_all'))}
                >
                    <i className="bi bi-people mx-1" /> All
                </ListGroupItem>




                <ListGroupItem
                    href="#"
                    tag="a"
                    className='bg-light py-3 border-0 mb-3'
                    // className={active === 'sales_department' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
                    onClick={() => dispatch(setVisibilityFilter('sales_department'))}
                >
                    <i className="bi bi-bookmark-star mx-1" /> Sales
                </ListGroupItem>
            </ListGroup>
        </div>
    );
};
export default LeftMenu;