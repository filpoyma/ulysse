import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { hotelService } from '../../../services/hotel.service.ts';
import { IHotel } from '../../../types/hotel.types.ts';
import { Loader } from '../../../components/Loader/Loader.tsx';
import NotFoundPage from '../../NotFoundPage/NotFoundPage.tsx';
import PlusCircle from '../../../assets/icons/plusInCircle.svg';
import InfoCircle from '../../../assets/icons/infoInCircle.svg';
import { ROOT_URL } from '../../../constants/api.constants.ts';
import styles from './SingleHotel.module.css';
import { LeftNav, RightNav } from '../../../components/Gallery/NavIcons.tsx';
import SingleHotelComponent from './SingleHotel.component.tsx';

const SingleHotel = ({ hotelId }: { hotelId: string }) => {
  console.log('file-SingleHotel.tsx hotelId:>>>>>>>>>>>>>>>>>>>>>>>>>>>>', hotelId);
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [hotel, setHotel] = useState<IHotel | null>(null);

  React.useEffect(() => {
    if (id || hotelId)
      hotelService
        .getById(id || hotelId)
        .then((hotel) => {
          console.log('Hotel data received:', hotel);
          setHotel(hotel.data);
        })
        .catch((error) => {
          console.error('Error fetching hotel:', error);
        })
        .finally(() => setIsLoading(false));
  }, [id, hotelId]);

  if (isLoading) return <Loader />;
  if (!hotel) return <NotFoundPage />;

  return <SingleHotelComponent hotel={hotel} />;
};

export default SingleHotel;
