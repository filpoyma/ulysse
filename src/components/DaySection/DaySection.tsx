import React from 'react';
import styles from './DaySection.module.css';
import PlusIcon from '../../assets/icons/plusInCircle.svg';
import InfoIcon from '../../assets/icons/infoInCircle.svg';

const DaySection: React.FC = () => {
  return (
    <>
      <div className={styles.container} id="day1">
        <div className={styles.header}>День 1 / 24 сентября</div>
        <div className={styles.content}>
          <div className={styles.title}>Заселение в Giraffe Manor</div>
          <div className={styles.night}>
            <p>1 ночь</p>
          </div>
          <div className={styles.description}>
            <a href={'#'}>Giraffe Manor</a> - это бутик-отель, принадлежащий компании The Safari
            Collection. Поместье расположено на 4 га частной территории в пригороде Лангата, который
            часто называют одним из самых популярных в мире. Историческая усадьба отсылает к 1930-м
            годам, когда путешественники впервые приехали в Восточную Африку, чтобы насладиться
            сафари. Одна из самых интересных вещей в Giraffe Manor - это обитающее здесь стадо
            жирафов Ротшильда, которые могут приходить сюда утром и вечером, высовывая свои длинные
            шеи в окна в надежде на угощение.
          </div>
          <div className={styles.infoContainer}>
            <PlusIcon height={31} width={31} />
            <div>Преимущества</div>
          </div>
          <ul>
            <li>Поместье, ставшее иконой исторического ландшафта Найроби</li>
            <li>Поместье, ставшее иконой исторического ландшафта Найроби</li>
          </ul>
          <div className={styles.infoContainer}>
            <InfoIcon height={31} width={31} />
            <div>Краткая информация</div>
          </div>
          <ul>
            <li>12 номеров;</li>
            <li>Ресторан;</li>
            <li>Лаундж;</li>
            <li>Салон красоты;</li>
            <li>Бутик;</li>
            <li>Сад;</li>
            <li>Терраса;</li>
            <li>Family friendly;</li>
            <li>Wi-Fi.</li>
          </ul>
        </div>

        <div className={styles.scheduleBlock}>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>10:00 Встреча с гидом в отеле</div>
              <div className={styles.scheduleDesc}>
                индивидуальная прогулка (Toyota Alphard) с русскоговорящим гидом. Современные районы
                столицы, мода, архитектура.
              </div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>
                10:30 – 11:30 Знаменитый самый загруженный перекресток Сибуя и памятник верному псу
                Хатико
              </div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>
                11:30 – 13:30 Харадзюку и улица молодежной моды Таксита
              </div>
              <div className={styles.scheduleDesc}>
                Улица с магазинами японских брендов Кэт стрит, бульвар Омотэсандо. По пути
                попадаются уютные кофейни, рестораны, галереи. Это районы, где можно поговорить о
                японской архитектуре и современном искусстве, понаблюдать за необычно одетыми
                местными жителями и их домами.
              </div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>13:30 – 15:00 Обед</div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>
                15:00 – 17:30 Продолжение прогулки по Омотэсандо и шопинг или же посещение обзорной
                площадки / музея
              </div>
              <div className={styles.scheduleDesc}>
                Обзорная площадка башни Мори – лучший вид на столицу. Один из лучших музеев
                современного искусства здесь же. Музей традиционного искусства Нэдзу.
              </div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>
                19:00 Ужин с дегустацией сакэ с опытным сомелье
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container} id="day2">
        <div className={styles.header}>День 2 / 25 сентября</div>
        <div className={styles.content}>
          <div className={styles.title}>Заселение в Giraffe Manor</div>
          <div className={styles.night}>
            <p>1 ночь</p>
          </div>
          <div className={styles.description}>
            <a href={'#'}>Giraffe Manor</a> - это бутик-отель, принадлежащий компании The Safari
            Collection. Поместье расположено на 4 га частной территории в пригороде Лангата, который
            часто называют одним из самых популярных в мире. Историческая усадьба отсылает к 1930-м
            годам, когда путешественники впервые приехали в Восточную Африку, чтобы насладиться
            сафари. Одна из самых интересных вещей в Giraffe Manor - это обитающее здесь стадо
            жирафов Ротшильда, которые могут приходить сюда утром и вечером, высовывая свои длинные
            шеи в окна в надежде на угощение.
          </div>
          <div className={styles.infoContainer}>
            <PlusIcon height={31} width={31} />
            <div>Преимущества</div>
          </div>
          <ul>
            <li>Поместье, ставшее иконой исторического ландшафта Найроби</li>
            <li>Поместье, ставшее иконой исторического ландшафта Найроби</li>
          </ul>
          <div className={styles.infoContainer}>
            <InfoIcon height={31} width={31} />
            <div>Краткая информация</div>
          </div>
          <ul>
            <li>12 номеров;</li>
            <li>Ресторан;</li>
            <li>Лаундж;</li>
            <li>Салон красоты;</li>
            <li>Бутик;</li>
            <li>Сад;</li>
            <li>Терраса;</li>
            <li>Family friendly;</li>
            <li>Wi-Fi.</li>
          </ul>
        </div>

        <div className={styles.scheduleBlock}>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>10:00 Встреча с гидом в отеле</div>
              <div className={styles.scheduleDesc}>
                индивидуальная прогулка (Toyota Alphard) с русскоговорящим гидом. Современные районы
                столицы, мода, архитектура.
              </div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>
                10:30 – 11:30 Знаменитый самый загруженный перекресток Сибуя и памятник верному псу
                Хатико
              </div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>
                11:30 – 13:30 Харадзюку и улица молодежной моды Таксита
              </div>
              <div className={styles.scheduleDesc}>
                Улица с магазинами японских брендов Кэт стрит, бульвар Омотэсандо. По пути
                попадаются уютные кофейни, рестораны, галереи. Это районы, где можно поговорить о
                японской архитектуре и современном искусстве, понаблюдать за необычно одетыми
                местными жителями и их домами.
              </div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>13:30 – 15:00 Обед</div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>
                15:00 – 17:30 Продолжение прогулки по Омотэсандо и шопинг или же посещение обзорной
                площадки / музея
              </div>
              <div className={styles.scheduleDesc}>
                Обзорная площадка башни Мори – лучший вид на столицу. Один из лучших музеев
                современного искусства здесь же. Музей традиционного искусства Нэдзу.
              </div>
            </div>
          </div>
          <div className={styles.scheduleItem}>
            <div>
              <div className={styles.scheduleTitle}>
                19:00 Ужин с дегустацией сакэ с опытным сомелье
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaySection;
