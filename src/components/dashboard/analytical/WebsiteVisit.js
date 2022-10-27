import { ButtonGroup, Button } from 'reactstrap';
import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const WebsiteVisit = () => {
  const optionsnewslatter = {
    chart: {
      fontFamily: "'Montserrat', sans-serif",
      toolbar: {
        show: false,
      },
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
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#06d79c', '#398bf7'],
    fill: {
      type: 'gradient',
      opacity: ['0.1', '0.1'],
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8'],
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
    markers: {
      size: 3,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      theme: 'dark',
    },
    legend: {
      show: false,
    },
  };
  const seriesnewslatter = [
    {
      name: 'Site A view',
      data: [0, 5, 6, 8, 25, 9, 8, 24],
    },
    {
      name: 'Site B view',
      data: [0, 3, 1, 2, 8, 1, 5, 1],
    },
  ];
  return (
    <DashCard
      title="Website Visit"
      actions={
        <div className="hstack gap-2">
          <div className="d-flex align-items-center text-success fs-6">
            <i className="bi bi-circle-fill fs-7 me-2"></i>Site A view
          </div>
          <div className="d-flex align-items-center text-info fs-6">
            <i className="bi bi-circle-fill fs-7 me-2 "></i>Site B view
          </div>
        </div>
      }
    >
      <div className="text-center my-4">
        <ButtonGroup>
          <Button size="sm" color="outline-secondary">
            Page Views
          </Button>
          <Button size="sm" color="outline-secondary">
            Referrals
          </Button>
        </ButtonGroup>
      </div>

      <div style={{ height: '395px' }}>
        <Chart options={optionsnewslatter} series={seriesnewslatter} type="area" height="395px" />
      </div>
    </DashCard>
  );
};

export default WebsiteVisit;
