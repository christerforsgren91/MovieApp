import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { ImageBackground } from 'react-native';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import { Button, H1, Image, Main, Paragraph, ScrollView, Text, YStack } from 'tamagui';
import { MediaType } from '~/interfaces/apiresult';
import { getMediaDetails } from '~/services/api';
type DetailsProps = {
  id: string;
  mediatype: MediaType;
};

const Details = ({ id, mediatype }: DetailsProps) => {
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediatype}-${id}`);
  const [favorites, setFavorites] = useMMKVObject('favorites');
  const mediaQuery = useQuery({
    queryKey: ['media', id, mediatype],
    queryFn: () => getMediaDetails(+id, mediatype),
  });

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Main>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button unstyled onPress={() => toggleFavorite()}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={26}
                color={isFavorite ? 'red' : 'white'}
              />
            </Button>
          ),
        }}
      />
      <ScrollView>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w400/${mediaQuery.data?.backdrop_path}` }}
        >
          <Image
            animation={'lazy'}
            w={200}
            h={300}
            m={20}
            borderRadius={10}
            source={{ uri: `https://image.tmdb.org/t/p/w400/${mediaQuery.data?.poster_path}` }}
          />
        </ImageBackground>
        <YStack
          p={10}
          animation={'lazy'}
          enterStyle={{
            opacity: 0,
            y: 10,
          }}
        >
          <H1 color={'$blue6Dark'}>
            {mediaQuery.data?.title} <Text>(2023)</Text>{' '}
          </H1>
          <Paragraph pb={16} color={'$blue10'}>
            {mediaQuery.data?.tagline}
          </Paragraph>
          <Text fontSize={16}>{mediaQuery.data?.overview}</Text>
        </YStack>
      </ScrollView>
    </Main>
  );
};

export default Details;
