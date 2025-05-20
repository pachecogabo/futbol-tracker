// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LiveMatchScreen from './src/screens/LiveMatchScreen';
import NextMatchScreen from './src/screens/NextMatchScreen';
import StandingsScreen from './src/screens/StandingsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="LiveMatch"
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ color, size }) => {
            let iconName: any;

            if (route.name === 'LiveMatch') iconName = 'football-outline';
            else if (route.name === 'NextMatch') iconName = 'calendar-outline';
            else if (route.name === 'Standings') iconName = 'stats-chart-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="LiveMatch" component={LiveMatchScreen} options={{ title: 'Partido en Vivo' }} />
        <Tab.Screen name="NextMatch" component={NextMatchScreen} options={{ title: 'Próximo Partido' }} />
        <Tab.Screen name="Standings" component={StandingsScreen} options={{ title: 'Tabla' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
