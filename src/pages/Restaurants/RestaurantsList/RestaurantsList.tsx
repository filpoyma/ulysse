import React, { useState, useEffect, useRef } from 'react';
import { restaurantsListService } from '../../../services/restaurantsList.service';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFullDataListRestaurants } from '../../../store/selectors.ts';
import SingleRestaurantComponent from '../SingleRestaurant/SingleRestaurant.component.tsx';
import EditButton from '../SingleRestaurant/EditButton.tsx';
import RestaurantsHeader from '../RestaurantsHeader/RestaurantsHeader.tsx';
import styles from './styles.module.css';

const RestaurantsList = () => {
  const { id } = useParams();
  const restaurantsListFull = useSelector(selectFullDataListRestaurants);
  const [currentSection, setCurrentSection] = useState('hero');
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (id) restaurantsListService.getFullById(id).catch(console.error);
  }, [id]);

  // Логика отслеживания текущей секции при скролле
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Находим все элементы с ID
      const heroElement = document.getElementById('hero');
      const mapElement = document.getElementById('map');
      const restaurantElements = restaurantsListFull.map(restaurant => 
        document.getElementById(restaurant._id)
      ).filter(Boolean);

      // Определяем текущую секцию
      let newCurrentSection = 'hero';

      // Проверяем hero секцию (первая секция)
      if (heroElement) {
        const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
        if (scrollTop < heroBottom - containerHeight / 2) {
          newCurrentSection = 'hero';
        }
      }

      // Проверяем map секцию
      if (mapElement) {
        const mapTop = mapElement.offsetTop;
        const mapBottom = mapElement.offsetTop + mapElement.offsetHeight;
        if (scrollTop >= mapTop - containerHeight / 2 && scrollTop < mapBottom - containerHeight / 2) {
          newCurrentSection = 'map';
        }
      }

      // Проверяем рестораны
      restaurantElements.forEach((element, index) => {
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = element.offsetTop + element.offsetHeight;
          if (scrollTop >= elementTop - containerHeight / 2 && scrollTop < elementBottom - containerHeight / 2) {
            newCurrentSection = `name${index}`;
          }
        }
      });

      setCurrentSection(newCurrentSection);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [restaurantsListFull]);

  return (
    <div>
      <EditButton restaurantListId={id} />
      <div className={styles.container} ref={containerRef}>
        <RestaurantsHeader currentSection={currentSection} />
        {restaurantsListFull.map((restaurant) => {
          return <SingleRestaurantComponent key={restaurant._id} restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
