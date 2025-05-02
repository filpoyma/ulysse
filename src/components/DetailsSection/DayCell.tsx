import React from 'react';

interface DayCellProps {
  title: string;
  subtitle: string;
  date: string;
}

export function DayCell({ title, subtitle, date }: DayCellProps) {
  return (
    <div className="day-cell">
      <div className="day-title">{title}</div>
      <div className="day-subtitle">{subtitle}</div>
      <div className="day-date">{date}</div>
    </div>
  );
}