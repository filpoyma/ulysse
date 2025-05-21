import api from './baseApi';

export interface HotelApiModel {
  _id?: string;
  name: string;
  country: string;
  type: string;
  region: string;
  createdAt?: string;
  updatedAt?: string;
}

const HotelApi = {
  basePath: 'hotels',

  getUrl(path: string = '') {
    return path ? `${this.basePath}/${path}` : this.basePath;
  },

  getAll(): Promise<{ data: HotelApiModel[] }> {
    return api.get(this.getUrl()).json();
  },

  getById(id: string): Promise<{ data: HotelApiModel }> {
    return api.get(this.getUrl(id)).json();
  },

  create(
    data: Omit<HotelApiModel, '_id' | 'createdAt' | 'updatedAt'>,
  ): Promise<{ data: HotelApiModel }> {
    return api.post(this.getUrl(), { json: data }).json();
  },

  update(id: string, data: Partial<HotelApiModel>): Promise<{ data: HotelApiModel }> {
    return api.put(this.getUrl(id), { json: data }).json();
  },

  delete(id: string): Promise<{ message: string }> {
    return api.delete(this.getUrl(id)).json();
  },
};

export default HotelApi;
