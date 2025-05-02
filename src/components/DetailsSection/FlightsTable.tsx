import React from 'react';
import { Plane } from 'lucide-react';
import { DayCell } from './DayCell';

export function FlightsTable() {
  return (
    <div className="details-table">
      <div className="table-header">
        <div className="header-cell">День</div>
        <div className="header-cell">Рейс</div>
      </div>
      <div className="table-row">
        <DayCell 
          title="День 2"
          subtitle="Вторник"
          date="24 сен 2025"
        />
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
        <DayCell 
          title="День 4"
          subtitle="Четверг"
          date="26 сен 2025"
        />
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
        <DayCell 
          title="День 7"
          subtitle="Воскресенье"
          date="29 сен 2025"
        />
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
        <DayCell 
          title="День 10"
          subtitle="Среда"
          date="2 ноя 2025"
        />
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
}