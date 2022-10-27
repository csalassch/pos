import { Row, Col, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const psalesData = [
  {
    title: '10,345',
    subtitle: 'Total Sales',
  },
  {
    title: '7,589',
    subtitle: 'This Month',
  },
  {
    title: '1,476',
    subtitle: 'This Week',
  },
];

const Sales = () => {
  const options = {
    chart: {
      id: 'basic-bar',
      fontFamily: "'Montserrat', sans-serif",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        show: true,
        style: {
          colors: '#99abb4',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: '#99abb4',
          fontSize: '12px',
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
    },
    colors: ['#398bf7'],
    stroke: {
      curve: 'straight',
      width: '3',
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.2)',
    },
    tooltip: {
      theme: 'dark',
    },
  };
  const series = [
    {
      name: 'Sales Overview',
      data: [0, 150, 110, 240, 200, 200, 300, 200, 380, 300, 400, 380],
    },
  ];
  return (
    <DashCard
      title="Sales of the year"
      subtitle="January 2022"
      actions={
        <Input type="select">
          <option>January 2022</option>
          <option>February 2022</option>
          <option>March 2022</option>
          <option>April 2022</option>
        </Input>
      }
    >
      <div style={{ height: '300px' }}>
        <Chart options={options} series={series} type="line" width="100%" height="300" />
      </div>
      <Row className="mt-4">
        {psalesData.map((pdata) => (
          <Col md="4" className="text-center mt-2 mt-md-0" key={pdata.title}>
            <span className="text-muted">{pdata.subtitle}</span>
            <h3 className="mb-0 mt-1 fw-normal">${pdata.title}</h3>
          </Col>
        ))}
      </Row>
    </DashCard>
  );
};

export default Sales;
