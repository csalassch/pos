import React from 'react';
import { VectorMap } from 'react-jvectormap';
import DashCard from '../dashboardCards/DashCard';
import '../../../views/maps/VectorMap.css';

const mapData = {
  FR: 540,
  AU: 360,
  GB: 690,
  GE: 200,
  IN: 400,
  RO: 600,
  RU: 300,
  US: 2920,
};

const TotalVisits = () => {
  return (
    <DashCard title="Total Visits" subtitle="January 2022">
      <div className="text-center mt-3 mb-3">
        <VectorMap
          map="world_mill"
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{
            width: '100%',
            height: '370px',
          }}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: 'transparent',
              'fill-opacity': 0.9,
              stroke: '#67757c',
              'stroke-width': 1,
              'stroke-opacity': 0.5,
            },
          }}
          series={{
            regions: [
              {
                values: mapData,
                scale: ['#f6f6f6', '#fafafa'],
              },
            ],
          }}
        />
      </div>
    </DashCard>
  );
};

export default TotalVisits;
