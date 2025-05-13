import styles from './index.module.css';
import { DayCell } from './DayCell';

export function AccommodationTable() {
  return (
    <div className={`${styles['details-table']} ${styles['accommodation-table']}`}>
      <div className={styles['table-header']}>
        <div className={styles['header-cell']}>День</div>
        <div className={styles['header-cell']}>Проживание</div>
        <div className={styles['header-cell']}>Детали</div>
        <div className={styles['header-cell']}>Ночи</div>
      </div>
      <div className={styles['table-row']}>
        <DayCell 
          title="День 1-2"
          subtitle="Понедельник"
          date="23 сен 2025"
        />
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>Giraffe Manor</div>
            </div>
          </div>
        </div>
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>—</div>
            </div>
          </div>
        </div>
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>1</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['table-row']}>
        <DayCell 
          title="День 2-4"
          subtitle="Вторник-Четверг"
          date="24-26 сен 2025"
        />
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>Segera Retreat</div>
            </div>
          </div>
        </div>
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>Garden House</div>
            </div>
          </div>
        </div>
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>2</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['table-row']}>
        <DayCell 
          title="День 4-7"
          subtitle="Четверг-Воскресенье"
          date="26-29 сен 2025"
        />
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>Sanctuary Olonana Camp</div>
            </div>
          </div>
        </div>
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>Suites</div>
            </div>
          </div>
        </div>
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>3</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['table-row']}>
        <DayCell 
          title="День 7-10"
          subtitle="Воскресенье-Среда"
          date="29 сен - 2 окт 2025"
        />
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>Alfagiri Villas</div>
            </div>
          </div>
        </div>
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>Villas</div>
            </div>
          </div>
        </div>
        <div className={styles['activities-cell']}>
          <div className={styles['activity-item']}>
            <div className={styles['activity-details']}>
              <div>3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}