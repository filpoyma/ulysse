import React, { forwardRef, useState } from 'react';
import { DetailsTabs } from './DetailsTabs';
import { OverviewTable } from './OverviewTable';
import { FlightsTable } from './FlightsTable';
import { AccommodationTable } from './AccommodationTable';

export const DetailsSection = forwardRef<HTMLElement>((_, ref) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section id="details" ref={ref} className="content-section">
      <div className="content-wrapper">
        <h2 className="details-title">ДЕТАЛИ МАРШРУТА</h2>
        
        <DetailsTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'overview' && <OverviewTable />}
        {activeTab === 'flights' && <FlightsTable />}
        {activeTab === 'accommodation' && <AccommodationTable />}
      </div>
    </section>
  );
});

DetailsSection.displayName = 'DetailsSection';