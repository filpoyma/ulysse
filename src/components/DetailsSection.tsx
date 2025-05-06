import { forwardRef, useState } from "react";
import { Map, Plane, Home } from "lucide-react";

export const DetailsSection = forwardRef<HTMLElement>((_, ref) => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderAccommodationTable = () => (
    <div className="details-table">
      <div className="table-header">
        <div className="header-cell">День</div>
        <div className="header-cell">Проживание</div>
        <div className="header-cell">Детали</div>
        <div className="header-cell">Ночи</div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 1-2</div>
          <div className="day-subtitle">Понедельник</div>
          <div className="day-date">23 сен 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>Giraffe Manor</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>—</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>1</div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 1-2</div>
          <div className="day-subtitle">Понедельник</div>
          <div className="day-date">23 сен 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>Giraffe Manor</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>—</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>1</div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 2-4</div>
          <div className="day-subtitle">Вторник-Четверг</div>
          <div className="day-date">24-26 сен 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>Segera Retreat</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>Garden House</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>2</div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 4-7</div>
          <div className="day-subtitle">Четверг-Воскресенье</div>
          <div className="day-date">26-29 сен 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>Sanctuary Olonana Camp</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>Suites</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>3</div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 7-10</div>
          <div className="day-subtitle">Воскресенье-Среда</div>
          <div className="day-date">29 сен - 2 окт 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>Alfagiri Villas</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>Villas</div>
            </div>
          </div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <div className="activity-details">
              <div>3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFlightsTable = () => (
    <div className="details-table">
      <div className="table-header">
        <div className="header-cell">День</div>
        <div className="header-cell">Рейс</div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 2</div>
          <div className="day-subtitle">Вторник</div>
          <div className="day-date">24 сен 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <Plane size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Регулярный рейс</div>
              <div>Перелет отправляется Wilson Airport</div>
              <div>Перелет прибывает Nanyuki Airstrip</div>
              <div className="activity-subtext">ПОДРОБНЕЕ</div>
            </div>
          </div>
          <div className="activity-item">
            <Plane size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Частный чартер</div>
              <div>Перелет отправляется Nanyuki Airstrip</div>
              <div>Перелет прибывает Segera Retreat</div>
              <div className="activity-subtext">ПОДРОБНЕЕ</div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 4</div>
          <div className="day-subtitle">Четверг</div>
          <div className="day-date">26 сен 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <Plane size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Частный чартер</div>
              <div>Перелет отправляется Nanyuki Airstrip</div>
              <div>Перелет прибывает Segera Retreat</div>
              <div className="activity-subtext">ПОДРОБНЕЕ</div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 7</div>
          <div className="day-subtitle">Воскресенье</div>
          <div className="day-date">29 сен 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <Plane size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Регулярный рейс</div>
              <div>Перелет отправляется Wilson Airport</div>
              <div>Перелет прибывает Nanyuki Airstrip</div>
              <div className="activity-subtext">ПОДРОБНЕЕ</div>
            </div>
          </div>
          <div className="activity-item">
            <Plane size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Частный чартер</div>
              <div>Перелет отправляется Nanyuki Airstrip</div>
              <div>Перелет прибывает Segera Retreat</div>
              <div className="activity-subtext">ПОДРОБНЕЕ</div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 10</div>
          <div className="day-subtitle">Среда</div>
          <div className="day-date">2 ноя 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <Plane size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Частный чартер</div>
              <div>Перелет отправляется Nanyuki Airstrip</div>
              <div>Перелет прибывает Segera Retreat</div>
              <div className="activity-subtext">ПОДРОБНЕЕ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverviewTable = () => (
    <div className="details-table">
      <div className="table-header">
        <div className="header-cell">День</div>
        <div className="header-cell">Активности</div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 1</div>
          <div className="day-subtitle">Понедельник</div>
          <div className="day-date">23 сен 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <Home size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Заселение в Giraffe Manor</div>
            </div>
          </div>
          <div className="activity-item">
            <Home size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Заселение в Hemingways Eden</div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-row">
        <div className="day-cell">
          <div className="day-title">День 2</div>
          <div className="day-subtitle">Вторник</div>
          <div className="day-date">24 сен 2025</div>
        </div>
        <div className="activities-cell">
          <div className="activity-item">
            <Home size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Выезд из Giraffe Manor</div>
            </div>
          </div>
          <div className="activity-item">
            <Home size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Выезд из Hemingways Eden</div>
            </div>
          </div>
          <div className="activity-item">
            <Plane size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Регулярный рейс</div>
              <div>Перелет отправляется Wilson Airport</div>
              <div>Перелет прибывает Nanyuki Airstrip</div>
              <div className="activity-subtext">ПОДРОБНЕЕ</div>
            </div>
          </div>
          <div className="activity-item">
            <Plane size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Частный чартер</div>
              <div>Перелет отправляется Nanyuki Airstrip</div>
              <div>Перелет прибывает Segera Retreat</div>
              <div className="activity-subtext">ПОДРОБНЕЕ</div>
            </div>
          </div>
          <div className="activity-item">
            <Home size={20} className="activity-icon" />
            <div className="activity-details">
              <div>Заселение в Segera Retreat</div>
              <div className="activity-subtext">ПОДРОБНЕЕ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="details" ref={ref} className="content-section">
      <div className="content-wrapper">
        <h2 className="details-title">ДЕТАЛИ МАРШРУТА</h2>

        <div className="details-tabs">
          <button
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <Map size={24} />
            <span>Обзор</span>
          </button>
          <button
            className={`tab ${activeTab === "flights" ? "active" : ""}`}
            onClick={() => setActiveTab("flights")}
          >
            <Plane size={24} />
            <span>Рейсы</span>
          </button>
          <button
            className={`tab ${activeTab === "accommodation" ? "active" : ""}`}
            onClick={() => setActiveTab("accommodation")}
          >
            <Home size={24} />
            <span>Проживание</span>
          </button>
        </div>

        {activeTab === "overview" && renderOverviewTable()}
        {activeTab === "flights" && renderFlightsTable()}
        {activeTab === "accommodation" && renderAccommodationTable()}
      </div>
    </section>
  );
});

DetailsSection.displayName = "DetailsSection";
