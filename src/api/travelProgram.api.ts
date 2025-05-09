import api from "../api/baseApi";


interface FirstPageData {
  title: string;
  subtitle: string;
  footer: string;
}

interface ApiResponse<T> {
  data: T;
}

const travelProgramApi = {
  basePath: "travel-program",
  getUrl(path?: string) {
    return path ? `${this.basePath}/${path}/` : `${this.basePath}/`;
  },
  async getAll() {
    const url = this.getUrl();
    return api.get(url).json();
  },
  async createTemplate(name: string) {
    const url = this.getUrl("template");
    return api.post(url, { json: { name } }).json();
  },
  async getById(id: string) {
    const url = this.getUrl(id);
    return api.get(url).json();
  },
  async getByName(name: string) {
    const url = this.getUrl(`name/${name}`);
    return api.get(url).json();
  },
  async delete(id: string) {
    const url = this.getUrl(id);
    return api.delete(url).json();
  },
  async updateFirstPage(id: string, data: FirstPageData) {
    const url = this.getUrl(`${id}/first-page`);
    return api.put(url, { json: { data } }).json();
  },
};

export default travelProgramApi;
