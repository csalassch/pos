import { Card, CardBody } from 'reactstrap';


const TotalRegistries = ({txt}) => {

    return (
        <Card className='border-0'>

            <CardBody>
                <div className='d-flex justify-content-center'>
                    <h1 style={{ fontWeight: "600", color: "#1186a2" }}>+300</h1>

                </div>
                <div className='d-flex justify-content-center' >

                    <h4 className='headingCard'>{txt}</h4>
                </div>
            </CardBody>
        </Card>
    );
};

export default TotalRegistries;
