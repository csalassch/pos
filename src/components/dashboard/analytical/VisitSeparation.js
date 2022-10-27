import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const visitorData = [
  {
    id: 1,
    title: 'Mobile',
    subtitle: '38.5%',
  },
  {
    id: 2,
    title: 'Tablet',
    subtitle: '30.8%',
  },
  {
    id: 3,
    title: 'Desktop',
    subtitle: '7.7%',
  },
];

const VisitSeparation = () => {
  const optionsvisitors = {
    labels: ['Tablet', 'Desktop', 'Other', 'Mobile'],
    chart: {
      fontFamily: "'Montserrat', sans-serif",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
      borderColor: 'transparent',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    stroke: {
      width: 1,
      colors: 'transparent',
    },
    legend: {
      show: false,
    },
    colors: ['#1e88e5', '#26c6da', '#eceff1', '#745af2'],
    tooltip: {
      fillSeriesColor: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
        },
      },
    ],
  };

  const seriesvisitors = [45, 15, 27, 18];
  return (
    <DashCard title="Visit Separation">
      <div className="mt-4 position-relative" style={{ height: '180px' }}>
        <Chart options={optionsvisitors} series={seriesvisitors} type="donut" height="180" />
      </div>
      <div className="mb-2">
        {visitorData.map((vdata) => (
          <div className="d-flex align-items-center border-bottom p-3" key={vdata.id}>
            <span>{vdata.title}</span>
            <div className="ms-auto">
              <span className="fw-bold">{vdata.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </DashCard>
  );
};

export default VisitSeparation;
