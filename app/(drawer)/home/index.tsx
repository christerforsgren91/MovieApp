import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Input, ScrollView, Spinner, YStack } from 'tamagui';
import MovieCard from '~/components/MovieCard';
import { getSearchResults, getTrending } from '~/services/api';
import { Container, Main, Subtitle, Title } from '~/tamagui.config';
import useDebounce from '~/utils/useDebounce';
const page = 1;

const Page = () => {
  const [searchString, setSearchString] = useState<string>('');
  const debouncedSearchString = useDebounce(searchString, 300);

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
  });

  const searchQuery = useQuery({
    queryKey: ['search', debouncedSearchString],
    queryFn: () => getSearchResults(debouncedSearchString),
    enabled: debouncedSearchString.length > 1,
  });

  return (
    <Main>
      <ImageBackground source={require('~/assets/clip.jpg')} style={{ width: '100%', height: 200 }}>
        <Container>
          <YStack>
            <Title
              enterStyle={{
                opacity: 0,
                scale: 1.5,
                y: -10,
              }}
              animation='quick'
            >
              Trending
            </Title>
            <Input
              placeholderTextColor={'#fff'}
              borderWidth={1}
              size={'$4'}
              value={searchString}
              placeholder='Search'
              onChangeText={(text) => setSearchString(text)}
            />
          </YStack>
        </Container>
      </ImageBackground>

      <Subtitle
        p={10}
        enterStyle={{
          opacity: 0,
          y: 10,
        }}
        animation='quick'
      >
        {searchQuery.data?.results ? 'Search Results' : 'Trending'}
      </Subtitle>
      {(trendingQuery.isLoading || searchQuery.isLoading) && (
        <Spinner size='large' color={'$blue10'} py={14} />
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={40}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}
      >
        {searchQuery.data?.results ? (
          <>
            {searchQuery.data.results.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </>
        ) : (
          <>
            {trendingQuery.data?.results && (
              <>
                {trendingQuery.data.results.map((item) => (
                  <MovieCard key={item.id} movie={item} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </Main>
  );
};

export default Page;
