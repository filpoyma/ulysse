import { IUploadedImage } from './uploadImage.types.ts';

export interface IRestaurant {
  _id?: string;
  name: string;
  country: string;
  city: string;
  region: string;
  link: string;
  manager: string;
  address: string;
  description: string;
  coordinates: [number, number];
  gallery: IUploadedImage[];
  titleImage: IUploadedImage;
  stars: number;
  createdAt?: string;
  updatedAt?: string;
}
