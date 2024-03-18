import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import Drawer from 'expo-router/drawer';

const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginLeft: -26 },
      }}
    >
      <Drawer.Screen
        name='home'
        options={{
          title: 'Movies & TV',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name='home' size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name='favorites'
        options={{
          title: 'Favorites',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name='heart' size={size} color={color} />,
        }}
      />
    </Drawer>
  );
};

export default Layout;
