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
  _id: string;
  city: string;
  coordinates: [number, number];
  hotel: string;
  sourceListIcon:
    | 'flightArrivalMarker'
    | 'hotelMarker'
    | 'flightDepartureMarker'
    | 'parkMarker'
    | 'photoSpotMarker'
    | 'sightMarker'
    | 'restMarker';
  sourceMapIcon: 'startPoint';
  routeType: 'driving' | 'helicopter' | 'flight' | 'yacht' | 'train';
  time: string;
  distance: string;
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
  };
  thirdPageMap: {
    id: string;
    logistics: ILogistics[];
    mapCenter: [number, number];
    zoom: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TravelProgramSingleResponse {
  data: ITravelProgramResponse;
}
