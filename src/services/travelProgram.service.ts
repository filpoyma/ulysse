import travelProgramApi from '../api/travelProgram.api.ts';
import { travelProgramActions } from '../store/reducers/travelProgram';
import { store } from '../store';
import { IFirstPageData } from '../types/travelProgram.types.ts';

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
  async updateFirstPage(programName: string, data: IFirstPageData) {
    const res = await travelProgramApi.updateFirstPage(programName, data);
    if (res?.data) {
      store.dispatch(travelProgramActions.updateProgram({ firstPage: res.data }));
    }
  },
  async updateReviewDay(
    programId: string,
    dayIndex: number,
    data: {
      day?: Date;
      numOfDay?: string;
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
    },
  ) {
    const res = await travelProgramApi.updateReviewDay(programId, dayIndex, data);
    if (res?.data) {
      const program = store.getState().travelProgram.program;
      if (program) {
        const updatedReview = [...program.secondPageTables.routeDetailsTable.review];
        updatedReview[dayIndex] = res.data;
        store.dispatch(
          travelProgramActions.updateProgram({
            secondPageTables: {
              ...program.secondPageTables,
              routeDetailsTable: {
                ...program.secondPageTables.routeDetailsTable,
                review: updatedReview,
              },
            },
          }),
        );
      }
    }
  },
  async updateAccommodationRow(
    programId: string,
    rowIndex: number,
    data: {
      period: string;
      hotelName: string;
      details: string;
      numOfNights: number;
    },
  ) {
    const res = await travelProgramApi.updateAccommodationRow(programId, rowIndex, data);
    if (res) {
      const program = store.getState().travelProgram.program;
      if (program) {
        const updatedAccommodation = [...program.secondPageTables.accommodation];
        updatedAccommodation[rowIndex] = res.data;
        store.dispatch(
          travelProgramActions.updateProgram({
            secondPageTables: {
              ...program.secondPageTables,
              accommodation: updatedAccommodation,
            },
          }),
        );
      }
    }
  },
  async deleteAccommodationRow(programId: string, rowIndex: number) {
    const res = await travelProgramApi.deleteAccommodationRow(programId, rowIndex);
    if (res) {
      const program = store.getState().travelProgram.program;
      if (program) {
        const updatedAccommodation = [...program.secondPageTables.accommodation];
        updatedAccommodation.splice(rowIndex, 1);
        store.dispatch(
          travelProgramActions.updateProgram({
            secondPageTables: {
              ...program.secondPageTables,
              accommodation: updatedAccommodation,
            },
          }),
        );
      }
    }
  },
};
