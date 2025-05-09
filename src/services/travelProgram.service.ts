import travelProgramApi from "../api/travelProgram.api.ts";
import { travelProgramActions } from "../store/reducers/travelProgram";
import { store } from "../store";

interface FirstPageData {
  title: string;
  subtitle: string;
  footer: string;
}

interface ApiResponse<T> {
  data: T;
}

export const travelProgramService = {
  getAll() {
    return travelProgramApi.getAll();
  },
  createTemplate(name: string) {
    return travelProgramApi.createTemplate(name);
  },
  async getById(id: string) {
    const res = await travelProgramApi.getById(id);
    if (res?.data) {
      store.dispatch(travelProgramActions.setProgram(res.data));
    }
  },
  async getByName(name: string) {
    const res = await travelProgramApi.getByName(name);
    if (res?.data) {
      store.dispatch(travelProgramActions.setProgram(res.data));
    }
  },
  async delete(id: string) {
    return travelProgramApi.delete(id);
  },
  async updateFirstPage(programName: string, data: FirstPageData) {
    const res = await travelProgramApi.updateFirstPage(programName, data);
    if (res?.data) {
      store.dispatch(
        travelProgramActions.updateProgram({ firstPage: res.data })
      );
    }
  },
};
