import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// For testing hardware set
const PatientHomeScreen= () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.topBar}>
      <Image
        source={require('../assets/LOGO.png')} // 替换为你的logo图片路径
        style={styles.logo}
        resizeMode="contain" // 保持图片宽高比
      />
    </View>
    <ScrollView style={styles.container}>

<View style={{ width: 48, height: 10 }} />
      <View style={styles.videoContainer}>
        <Image
          style={styles.videoThumbnail}
          source={require('../assets/icon.png')} // replace with your local image
        />
        {/* Video play button, etc. */}
      </View>

      <View style={styles.recordContainer}>
        <Text style={styles.recordTitle}>The latest Record</Text>
        <View style={styles.clinicInfo}>
          <Image
            style={styles.clinicAvatar}
            source={require('../assets/icon.png')} // replace with your local image
          />
          <Text style={styles.clinicName}>Clinic Name</Text>
        </View>
        <TouchableOpacity style={styles.moreDetailsButton}>
          <Text style={styles.moreDetailsText}>more details</Text>
        </TouchableOpacity>
        </View>
        
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
      </ScrollView>   



      <View style={styles.navBar}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="mail" size={24} color="gray" />
        </TouchableOpacity>
        <View style={{ width: 48, height: 48 }} />
        <TouchableOpacity>
          <Ionicons name="time" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="gray" />
        </TouchableOpacity>
              <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('CameraScreen')}>
        <Ionicons name="camera" size={24} color="white" />
      </TouchableOpacity>
      </View>

  
  </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: '#EFEFEF', 
    justifyContent: 'space-between',
  },
  topBar: {
    height: 60, 
    backgroundColor: '#EFEFEF', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180, 
    height: 60, 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoContainer: {
    height: 200, // Set the height you want
    backgroundColor: '#ddd', // Placeholder for video player
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  recordContainer: {
    padding: 20,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clinicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clinicAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  clinicName: {
    fontSize: 16,
  },
  moreDetailsButton: {
    marginTop: 10,
  },
  moreDetailsText: {
    color: '#00f',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
    cameraButton: {
    position: 'absolute',
    bottom: 20, 
    left: '50%', 
    marginLeft: -18, 
    width: 60, 
    height: 60, 
    borderRadius: 24, 
    backgroundColor: '#029C93', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 10, 
  },
});

export default PatientHomeScreen;