import { MediaType } from './apiresult';

export type Favorite = {
  id: string;
  mediatype: MediaType;
  name: string;
  poster_path: string;
};
