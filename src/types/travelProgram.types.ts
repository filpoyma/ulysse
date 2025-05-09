export interface BackgroundImage {
  _id: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface FirstPage {
  title: string;
  subtitle: string;
  footer: string;
}

export interface TravelProgram {
  _id: string;
  name: string;
  name_eng: string;
  createdAt: string;
  updatedAt: string;
  bgImages: BackgroundImage[];
  firstPage: FirstPage;
  // TODO: Add more fields as needed
}

export interface TravelProgramResponse {
  data: TravelProgram[];
}

export interface TravelProgramSingleResponse {
  data: TravelProgram;
}
