/* eslint-disable react/prop-types */
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TabBarIcon from 'components/common/TabBarIcon';
import Home from 'components/Home';
import Profile from 'components/Profile';
import navigationConstants from 'constants/navigation';
import Details from 'components/Details';
import Colors from 'constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { home, profile, details } = navigationConstants;

function HomeNavigator() {
  const androidHeaderStyle = {
    alignSelf: 'center',
  };
  const iOSHeaderStyle = {
    color: Colors.white,
    backgroundColor: Colors.black,
    opacity: 0.5,
  };
  const headerLeftiOS = {
    width: 80,
    height: 40,
    opacity: 0.5,
    backgroundColor: Colors.black,
  };
  const headerLeftContainerStyle = Platform.OS === 'ios' ? headerLeftiOS : null;
  const headerTitleStyle =
    Platform.OS === 'ios' ? iOSHeaderStyle : androidHeaderStyle;

  const headerOptions = {
    title: 'Movie details',
    headerBackTitle: 'back',
    headerLeftContainerStyle,
    headerTransparent: true,
    headerTitleStyle,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={home}
        component={Home}
        options={{ headerTitleStyle: androidHeaderStyle }}
      />
      <Stack.Screen
        name={details}
        component={Details}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={profile} component={Profile} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route: { name } }) => ({
        tabBarIcon: ({ color }) => <TabBarIcon color={color} name={name} />,
      })}
      tabBarOptions={{
        activeTintColor: colors.activeTab,
        inactiveTintColor: colors.inactiveTab,
      }}
    >
      <Tab.Screen name={home} component={HomeNavigator} />
      <Tab.Screen name={profile} component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
