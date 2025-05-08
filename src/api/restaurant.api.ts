import api from './baseApi';

export interface RestaurantApiModel {
  _id?: string;
  name: string;
  country: string;
  city: string;
  region: string;
  manager: string;
  stars: number;
  createdAt?: string;
  updatedAt?: string;
}

const RestaurantApi = {
  basePath: 'restaurants',

  getUrl(path: string = '') {
    return path ? `${this.basePath}/${path}` : this.basePath;
  },

  getAll(): Promise<{ data: RestaurantApiModel[] }> {
    return api.get(this.getUrl(), { timeout: 10000 }).json();
  },

  getById(id: string): Promise<{ data: RestaurantApiModel }> {
    return api.get(this.getUrl(id), { timeout: 10000 }).json();
  },

  create(data: Omit<RestaurantApiModel, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ data: RestaurantApiModel }> {
    return api.post(this.getUrl(), { json: data, timeout: 10000 }).json();
  },

  update(id: string, data: Partial<RestaurantApiModel>): Promise<{ data: RestaurantApiModel }> {
    return api.put(this.getUrl(id), { json: data, timeout: 10000 }).json();
  },

  delete(id: string): Promise<{ message: string }> {
    return api.delete(this.getUrl(id), { timeout: 10000 }).json();
  },
};

export default RestaurantApi; 