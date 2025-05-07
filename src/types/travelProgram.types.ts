export interface BackgroundImage {
  _id: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface TravelProgram {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  bgImages: BackgroundImage[];
  // TODO: Add more fields as needed
}

export interface TravelProgramResponse {
  data: TravelProgram[];
}

export interface TravelProgramSingleResponse {
  data: TravelProgram;
} 