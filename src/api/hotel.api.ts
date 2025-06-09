import api from './baseApi';
import { IHotel } from '../types/hotel.types.ts';

const HotelApi = {
  basePath: 'hotels',

  getUrl(path: string = '') {
    return path ? `${this.basePath}/${path}` : this.basePath;
  },

  getAll(): Promise<{ data: IHotel[] }> {
    return api.get(this.getUrl()).json();
  },

  getById(id: string): Promise<{ data: IHotel }> {
    return api.get(this.getUrl(id)).json();
  },

  create(data: Omit<IHotel, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ data: IHotel }> {
    return api.post(this.getUrl(), { json: data }).json();
  },

  update(id: string, data: Partial<IHotel>): Promise<{ data: IHotel }> {
    return api.put(this.getUrl(id), { json: data }).json();
  },

  delete(id: string): Promise<{ message: string }> {
    return api.delete(this.getUrl(id)).json();
  },
};

export default HotelApi;
