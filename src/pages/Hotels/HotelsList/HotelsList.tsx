import React from 'react';
import { useParams } from 'react-router-dom';
import { hotelsListService } from '../../../services/hotelsList.service.ts';
import { useSelector } from 'react-redux';
import { selectHotels } from '../../../store/selectors.ts';
import SingleHotelComponent from '../SingleHotel/SingleHotel.component.tsx';

const HotelsList = () => {
  const { id } = useParams();
  const hotels = useSelector(selectHotels);

  React.useEffect(() => {
    if (id) hotelsListService.getFullById(id).catch(console.error);
  }, [id]);

  return (
    <div>
      {hotels.map((hotel) => {
        return <SingleHotelComponent hotel={hotel} />;
      })}
    </div>
  );
};

export default HotelsList;
