import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import { globalStyles,colors } from '../styles/globalStyles';
import RecordCard from '../components/RecordCard';


// For testing hardware set
const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopBar />
      
    <ScrollView style={styles.container}>

      <View style={{ width: 48, height: 10 }} />
        <View style={globalStyles.card}>
        <Image
          style={styles.videoThumbnail}
          source={require('../assets/icon.png')} // replace with your local image
        />
        {/* Video play button, etc. */}
        </View>
      <View style={{ width: 48, height: 20 }} />

          <Text style={styles.recordTitle}>The latest Record</Text>
                <View style={{ width: 48, height: 20 }} />
          <RecordCard />

        
      </ScrollView>   

      <CustomBottom_Patient />

      {/* <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Messages') {
              iconName = focused ? 'mail' : 'mail';
            } else if (route.name = 'History') {
              iconName = focused ? 'time' : 'time';
            } else if (route.name = 'Profile') {
              iconName = focused ? 'person' : 'person';
            }  

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#029C93',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={PatientHomeScreenHomeScreen} />
        <Tab.Screen name="Messages" component={PatientHomeScreenHomeScreen} />
        <Tab.Screen name="History" component={PatientHomeScreenHomeScreen} />
        <Tab.Screen name="Profile" component={PatientHomeScreenHomeScreen} />
      </Tab.Navigator>
      </NavigationContainer> */}
  </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: '#EFEFEF', 
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoContainer: {
   
    height: 500, // Set the height you want
    backgroundColor: '#ddd', // Placeholder for video player
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  recordContainer: {
    flex:1,
    padding: 20,
  },
  recordTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.green_dark
  },
});

export default HomeScreen;