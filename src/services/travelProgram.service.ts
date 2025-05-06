import api from '../api/baseApi';

export const travelProgramService = {
  async getAll() {
    return api.get('travel-program').json();
  },
  async createTemplate(name: string) {
    return api.post('travel-program/template', { json: { name } }).json();
  },
  async getById(id: string) {
    return api.get(`travel-program/${id}`).json();
  },
  async getByName(name: string) {
    return api.get(`travel-program/name/${name}`).json();
  },
}; 