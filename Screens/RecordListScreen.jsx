import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import RecordCard from '../components/RecordCard';
import { auth, db } from '../firebaseConfig'; // Ensure correct imports
import { doc, getDoc } from 'firebase/firestore';

// To do List:
// * Navigate to the chat detail page
// * Update/link the page info with the info from database
// * Add multiple record cards (how to add all in the database)
// * A share button that can be easily shared to others via message

const RecordListScreen = ({ navigation }) => {
  const [userRole, setUserRole] = useState(null); // State to store user role

  // Fetch user role from Firebase
  const fetchUserRole = async () => {
    try {
      const user = await new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          unsubscribe();
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        }, reject);
      });

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role); // Set user role state
        } else {
          console.log("No such document!");
        }
      } else {
        setUserRole(null); // Set user role state to null if no user
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  // Use effect to fetch user role on component mount
  useEffect(() => {
    fetchUserRole();
  }, []);

  // Example record data to be displayed in the RecordCard component
  const recordExample = {
    clinicName: "Happy Eye Clinic",
    patientName: "John Doe",
    time: "2023-03-03 14:30",
    summary: "Routine Checkup",
    details: "No cavities found.",
    imageUri: "https://example.com/example-image.jpg", // Example image URL
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopBar />
      <ScrollView style={styles.container}>
        <View style={styles.container1}>
          <RecordCard 
            record={recordExample} 
            isClinicUser={userRole === 'clinic'} // Dynamically set based on user role
          />
        </View>
      </ScrollView>
      {userRole === 'clinic' ? <CustomBottom_Clinic /> : <CustomBottom_Patient />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    flexGrow: 1,
  },
});

export default RecordListScreen;
