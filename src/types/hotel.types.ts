export interface IHotel {
  _id?: string;
  name: string;
  country: string;
  region: string;
  link: string;
  address: string;
  mainImage: string;
  coordinates: [number, number];
  hotelInfo: {
    gallery: string[];
    about: string;
  };
  roomInfo: {
    gallery: string[];
    about: string;
  };
  pros: string[];
  shortInfo: string[];
  createdAt?: string;
  updatedAt?: string;
}
