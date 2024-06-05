import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native';
import { CustomTopBar } from '../components/Topbar';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { getAuth, db } from "../firebaseConfig";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

// ChatListScreen component displays the list of chat participants
const ChatListScreen = ({ navigation }) => {
  const [chatParticipants, setChatParticipants] = useState([]); // State to store chat participants
  const [userRole, setUserRole] = useState(null); // State to store user role

  // Function to fetch chat data from Firestore
  const fetchChatData = async () => {
    try {
      // Get current authenticated user
      const user = await new Promise((resolve, reject) => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
          unsubscribe();
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        }, reject);
      });

      if (user) {
        // Get user document from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);

          // Query to get chats involving the current user
          const q = query(collection(db, "chats"), where("participants", "array-contains", user.uid));
          const chatDataSnapshot = await getDocs(q);

          const fetchedChatData = [];
          // Fetch chat participants data
          await Promise.all(chatDataSnapshot.docs.map(async (doc) => {
            const participants = doc.data().participants;
            const otherUserId = participants.filter(id => id !== user.uid);

            const userSnapshot = await getDocs(query(collection(db, "users"), where("uid", "in", otherUserId)));
            userSnapshot.forEach(userDoc => {
              const otherUserName = userDoc.data().name;
              const avatarUrl = userDoc.data().avatarUrl || ''; // Fetch the avatar URL
              fetchedChatData.push({ id: otherUserId, name: otherUserName, avatarUrl });
            });
          }));

          setChatParticipants(fetchedChatData);
        } else {
          console.log("No such document!");
        }
      } else {
        setChatParticipants([]);
      }
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  // Use effect to fetch chat data on component mount
  useEffect(() => {
    fetchChatData();
  }, []);

  // Render each chat participant item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ChatDetail', {
        name: item.name,
        avatarUrl: item.avatarUrl,
        userId: item.id,
      })}
    >
      <View style={styles.chatItem}>
        <Image
          source={item.avatarUrl ? { uri: item.avatarUrl } : require('../assets/Profile.png')}
          style={styles.avatar}
        />
        <View style={styles.messageContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomTopBar />
        <FlatList
          data={chatParticipants}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      {userRole === 'clinic' ? <CustomBottom_Clinic /> : <CustomBottom_Patient />}
    </SafeAreaView>
  );
};

// Styles for the ChatListScreen component
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 2,
  },
  messageContainer: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginLeft: 16,
    marginRight: 16,
  },
});

export default ChatListScreen;
