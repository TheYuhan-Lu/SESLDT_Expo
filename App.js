import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from './screens/CameraScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecordListScreen from './screens/RecordListScreen';

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  console.log("App executed");

  return (
    //<AuthScreen />
    // <HomeScreen />
    // <ProfileScreen />
    // <ChatListScreen />
    // <RecordListScreen />
    // <ChatDetailScreen />
    // <CameraScreen />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthrcScreen">
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RecordList" component={RecordListScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chatlist" component={ChatListScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 





