import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatListScreen from './screens/ChatListScreen';
import RecordListScreen from './screens/RecordListScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';
import CameraScreen from './screens/CameraScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileInfoScreen from './screens/ProfileInfoScreen';

const Stack = createStackNavigator();

export default function App() {
  console.log("App executed");

  return (
    // <ChatDetailScreen />
    // <ProfileInfoScreen />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthScreen" screenOptions={{headerShown: false,}}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RecordList" component={RecordListScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
        <Stack.Screen name="Chatlist" component={ChatListScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 





