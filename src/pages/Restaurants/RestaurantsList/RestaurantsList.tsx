import React from 'react';
import { restaurantsListService } from '../../../services/restaurantsList.service';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFullDataListRestaurants } from '../../../store/selectors.ts';
import SingleRestaurantComponent from '../SingleRestaurant/SingleRestaurant.component.tsx';
import EditButton from '../SingleRestaurant/EditButton.tsx';

const RestaurantsList = () => {
  const { id } = useParams();
  const restaurantsListFull = useSelector(selectFullDataListRestaurants);

  React.useEffect(() => {
    if (id) restaurantsListService.getFullById(id).catch(console.error);
  }, [id]);

  return (
    <div>
      <EditButton restaurantListId={id} />
      {restaurantsListFull.map((restaurant) => {
        return <SingleRestaurantComponent key={restaurant._id} restaurant={restaurant} />;
      })}
    </div>
  );
};

export default RestaurantsList;
