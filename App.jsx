import React from 'react';
import {Text, View} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ToDo from './src/screens/ToDo';
import Done from './src/screens/Done';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Task from './src/screens/Task';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store';

function HomeTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0080ff',
        tabBarInactiveTintColor: '#777777',
        tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'ToDo') {
            iconName = 'clipboard-list';
            size = focused ? 25 : 20;
          } else if (route.name === 'Done') {
            iconName = 'clipboard-check';
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="ToDo" component={ToDo} />
      <Tab.Screen name="Done" component={Done} />
    </Tab.Navigator>
  );
}

const App = () => {
  const Stack = createStackNavigator();
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            headerTitleAlign: 'center',
          })}>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="My Tasks" component={HomeTabs} />
          <Stack.Screen name="Task" component={Task} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
