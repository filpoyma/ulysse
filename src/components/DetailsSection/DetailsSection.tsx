import { forwardRef, useState } from "react";
import { DetailsTabs } from "./DetailsTabs";
import { OverviewTable } from "./OverviewTable";
import { FlightsTable } from "./FlightsTable";
import { AccommodationTable } from "./AccommodationTable";
import styles from './DetailsSection.module.css';

export const DetailsSection = forwardRef<HTMLElement>((_, ref) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section id="details" ref={ref} className={styles.contentSection}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.detailsTitle}>ДЕТАЛИ МАРШРУТА</h2>

        <DetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "overview" && <OverviewTable />}
        {activeTab === "flights" && <FlightsTable />}
        {activeTab === "accommodation" && <AccommodationTable />}
      </div>
    </section>
  );
});

DetailsSection.displayName = "DetailsSection";
