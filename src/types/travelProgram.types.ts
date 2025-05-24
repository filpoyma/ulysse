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
export interface ILogistics {
  city: 'Tokyo';
  coordinates: [139.7671, 35.6812];
  hotel: 'Aman Tokyo';
  sourceIcon: 'flightArrivalMarker';
  routeType: 'flight';
  time: '1ч 20мин';
  distance: '186км';
}

export interface ITravelProgramResponse {
  _id: string;
  id: string;
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
        id: string;
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
    thirdPageMap: {
      logisti;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface TravelProgramSingleResponse {
  data: ITravelProgramResponse;
}
