export interface IUploadedImage {
  _id: string;
  id?: string;
  filename: string;
  path: string;
  originalName?: string;
  mimetype?: string;
  size?: number;
}

export interface IFirstPageData {
  title: string;
  subtitle: string;
  footer: string;
}

export interface IAccommodation {
  period: string;
  hotelName: string;
  details: string;
  numOfNights: number;
}

export interface ITravelProgramResponse {
  _id: string;
  name: string;
  name_eng: string;
  days: number;
  bgImages: IUploadedImage[];
  firstPage: {
    title: string;
    subtitle: string;
    footer: string;
  };
  secondPageTables: {
    routeDetailsTable: {
      review: {
        day: string;
        numOfDay: number;
        activity: {
          id: string;
          icon: string;
          dayActivity: {
            id: string;
            line1: string;
            line2: string;
            line3: string;
            isFlight: boolean;
            more: string;
          };
        }[];
      }[];
    };
    accommodation: IAccommodation[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface TravelProgramSingleResponse {
  data: ITravelProgramResponse;
}
