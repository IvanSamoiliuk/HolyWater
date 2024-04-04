import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {VideoScreen} from './src/screens/VideoScreen';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

const HomeStack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Video"
            component={VideoScreen}
            options={{headerShown: false}}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
