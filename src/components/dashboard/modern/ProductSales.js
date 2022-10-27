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

const ProductSales = () => {
  const optionsproduct = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
      fontFamily: "'Montserrat', sans-serif",
      zoom: {
        enabled: false,
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.2)',
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40px',
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
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    colors: ['#398bf7', 'rgba(57, 139, 247, 0.8)', 'rgba(57, 139, 247, 0.4)'],
    tooltip: {
      theme: 'dark',
    },
  };
  const seriesproduct = [
    {
      name: 'Sales A',
      data: [44, 55, 41, 67, 22, 43, 27, 45, 15, 44, 30, 15],
    },
    {
      name: 'Sales B',
      data: [13, 23, 20, 8, 13, 27, 23, 20, 8, 13, 27, 50],
    },
    {
      name: 'Sales C',
      data: [11, 17, 15, 15, 21, 14, 17, 15, 15, 21, 14, 55],
    },
  ];
  return (
    <DashCard
      title="Product Sales"
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
        <Chart options={optionsproduct} series={seriesproduct} type="bar" height="300" />
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

export default ProductSales;
