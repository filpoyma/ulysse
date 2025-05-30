export type RouteType = 'driving' | 'helicopter' | 'flight' | 'yacht' | 'train';

export interface ILogistics {
  _id: string;
  city: string;
  coordinates: [number, number];
  hotel: string;
  sourceListIcon: string;
  routeType: RouteType;
  time: string;
  distance: string;
} 