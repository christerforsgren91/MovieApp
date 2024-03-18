import { DrawerToggleButton } from '@react-navigation/drawer';
import { colorTokens } from '@tamagui/themes';
import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorTokens.dark.blue.blue7,
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Movies & TV',
          headerLeft: () => <DrawerToggleButton tintColor='#fff' />,
        }}
      />
      <Stack.Screen name='movie/[id]' options={{ title: '', headerBackTitle: 'Back' }} />
      <Stack.Screen name='tv/[id]' options={{ title: '', headerBackTitle: 'Back' }} />
    </Stack>
  );
};

export default Layout;
