import { MediaDetailes, MediaType, TrendingResult } from '~/interfaces/apiresult';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const getTrending = async (): Promise<TrendingResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=1`
  );
  const json = await response.json();
  return json;
};

export const getSearchResults = async (query: string): Promise<TrendingResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&include_adult=false&language=en-US&api_key=${API_KEY}&page=1`
  );
  const data = await response.json();
  return data;
};

export const getMediaDetails = async (id: number, type: MediaType): Promise<MediaDetailes> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
