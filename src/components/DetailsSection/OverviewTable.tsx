import React from 'react';
import { Home, Plane } from 'lucide-react';
import { DayCell } from './DayCell';

export function OverviewTable() {
  return (
    <div className="details-table">
      <div className="table-header">
        <div className="header-cell">День</div>
        <div className="header-cell">Активности</div>
      </div>
      <div className="table-row">
        <DayCell 
          title="День 1"
          subtitle="Понедельник"
          date="23 сен 2025"
        />
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
        <DayCell 
          title="День 2"
          subtitle="Вторник"
          date="24 сен 2025"
        />
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
}