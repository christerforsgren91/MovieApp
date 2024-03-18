import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import Details from '~/components/Details';
import { MediaType } from '~/interfaces/apiresult';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <Details id={id} mediatype={MediaType.MOVIE} />;
};

export default Page;
