import api from "../api/baseApi";
import {
  IFirstPageData,
  ITravelProgramResponse,
  TravelProgramSingleResponse,
} from "../types/travelProgram.types.ts";

interface FirstPageData {
  title: string;
  subtitle: string;
  footer: string;
}

const travelProgramApi = {
  basePath: "travel-program",
  getUrl(path?: string) {
    return path ? `${this.basePath}/${path}/` : `${this.basePath}/`;
  },
  async getAll(): Promise<{ data: ITravelProgramResponse[] }> {
    const url = this.getUrl();
    return api.get(url).json();
  },
  async createTemplate(name: string): Promise<TravelProgramSingleResponse> {
    const url = this.getUrl("template");
    return api.post(url, { json: { name } }).json();
  },
  async getById(id: string): Promise<TravelProgramSingleResponse> {
    const url = this.getUrl(id);
    return api.get(url).json();
  },
  async getByName(name: string): Promise<TravelProgramSingleResponse> {
    const url = this.getUrl(`name/${name}`);
    return api.get(url).json();
  },
  async delete(id: string) {
    const url = this.getUrl(id);
    return api.delete(url).json();
  },
  async updateFirstPage(
    id: string,
    data: FirstPageData
  ): Promise<{ data: IFirstPageData; success: boolean }> {
    const url = this.getUrl(`${id}/first-page`);
    return api.put(url, { json: data }).json();
  },
  async updateReviewDay(
    id: string,
    dayIndex: number,
    data: {
      day?: string;
      activity?: {
        icon: string;
        dayActivity: {
          line1: string;
          line2?: string;
          line3?: string;
          isFlight: boolean;
          more?: string;
        };
      }[];
    }
  ): Promise<{ data: any; success: boolean }> {
    const url = this.getUrl(`${id}/review-day/${dayIndex}`);
    return api.put(url, { json: data }).json();
  },
};

export default travelProgramApi;
