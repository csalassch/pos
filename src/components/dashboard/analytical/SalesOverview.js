import { Card, CardBody, CardTitle, Input } from 'reactstrap';
import Chart from 'react-apexcharts';

const SalesOverview = () => {
  const optionscampaign = {
    chart: {
      id: 'basic-bar',
      animations: {
        easing: 'easeinout',
      },
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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
      show: true,
      borderColor: 'rgba(0, 0, 0, .2)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };
  const seriescampaign = [
    {
      name: 'Sales Overview',
      data: [0, 150, 110, 240, 200, 200, 300, 200, 380, 300, 400, 380],
    },
  ];
  return (
    <Card>
      <span className="lstick bg-info"></span>
      <CardBody>
        <div className="d-md-flex align-items-center">
          <CardTitle tag="h4">Sales Overview</CardTitle>
          <div className="ms-auto mt-3 mt-md-0">
            <Input type="select">
              <option>January 2022</option>
              <option>February 2022</option>
              <option>March 2022</option>
              <option>April 2022</option>
            </Input>
          </div>
        </div>
      </CardBody>
      <div className="bg-info">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="p-3 w-100 text-truncate">
              <h6 className="text-dark-white">Total Sales</h6>
              <h3 className="text-dark-white m-b-0">$10,345</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="p-3 w-100 text-truncate">
              <h6 className="text-dark-white">This Month</h6>
              <h3 className="text-dark-white m-b-0">$7,589</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="p-3 w-100 text-truncate">
              <h6 className="text-dark-white">This Week</h6>
              <h3 className="text-dark-white m-b-0">$1,476</h3>
            </div>
          </div>
        </div>
      </div>
      <CardBody>
        <div className="">
          <div className="">
            <Chart options={optionscampaign} series={seriescampaign} type="line" height="220" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesOverview;
