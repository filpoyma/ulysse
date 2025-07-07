import React, { useRef, useState, useEffect } from 'react';
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
  const [currentSection, setCurrentSection] = useState('');;
  const containerRef = useRef<HTMLDivElement>(null);
  const restaurantRefs = useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (id) restaurantsListService.getFullById(id).catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!restaurantsListFull.length) return;
    const observerOptions = {
      root: containerRef.current,
      rootMargin: '0px 0px -60% 0px', // Срабатывает, когда верхняя часть ресторана входит в верхнюю треть контейнера
      threshold: 0.1,
    };
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top));
      if (visible.length > 0) {
        setCurrentSection(visible[0].target.id);
      }
    };
    const observer = new window.IntersectionObserver(handleIntersect, observerOptions);
    restaurantRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => {
      observer.disconnect();
    };
  }, [restaurantsListFull]);

  return (
    <div>
      <EditButton restaurantListId={id} />
      <div className={styles.container} ref={containerRef}>
        <RestaurantsHeader currentSection={currentSection} />
        {restaurantsListFull.map((restaurant, idx) => (
          <div
            key={restaurant._id}
            id={restaurant._id}
             ref={el => (restaurantRefs.current[idx] = el)}
          >
            <SingleRestaurantComponent restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsList;
