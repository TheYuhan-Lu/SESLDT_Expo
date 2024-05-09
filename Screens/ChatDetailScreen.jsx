import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { collection, query, orderBy, onSnapshot, setDoc, serverTimestamp, doc, where} from "firebase/firestore";
import {getApp, getAuth, auth , db} from "../firebaseConfig";
import { useEffect } from 'react';

const ChatDetailScreen = ({ navigation, route }) => {
  const { userName, userAvatar, receiverUID } = route.params; // Assuming you pass receiver UID from the previous screen
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await new Promise((resolve, reject) => {
          const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
          }, reject);
        });
        setCurrentUserId(user?.uid || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const onSend = async (message) => {
    if (message.trim()) {
      try {
        const newMessageRef = doc(collection(db, "messages")); // Create a new document reference with auto-generated ID
        await setDoc(newMessageRef, { // Set document data
          sender: currentUserId,
          receiver: "a",
          text: message,
          timestamp: serverTimestamp()
        });
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  useEffect(() => {
    // Create a query to fetch messages where the sender or receiver is the current user
    const messagesQuery = query(
      collection(db, "messages"),
      where("sender", "==", currentUserId), // Messages sent by the current user
      orderBy("timestamp") // Order messages by timestamp
    );
    if (messagesQuery.empty) {
      console.log("No matching messages found.");
    } else {
      console.log("Matching messages found.");
    }
    // Subscribe to changes in the query
    const unsubscribe = onSnapshot(messagesQuery, snapshot => {
      const messages = [];
      snapshot.forEach(doc => {
        console.log(doc.data());
        messages.push(doc.data());
      });
      setMessages(messages);
    });
  
    return () => unsubscribe(); // Cleanup function
  }, [currentUserId]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
    return (
          <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 80}
    >
    <View style={styles.header}>
        <TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate('Chatlist')}>
          <Ionicons name="close" size={30} color="gray" />
        </TouchableOpacity>     
        {/* Sample here*/}           
        <Text style={styles.userName}>Alice</Text>
                    
        <TouchableOpacity onPress={() => navigation.navigate('ProfileInfo')}>
          <Image source={require('../assets/Profile.png')} style={styles.userAvatar} />
        </TouchableOpacity>
                    
        {/* <Text style={styles.userName}>{userName}</Text>
                    
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userName })}>
          <Image source={{ uri: userAvatar }} style={styles.userAvatar} />
        </TouchableOpacity> */}
    </View>
                <ScrollView>
                {messages.map((message, index) => (
                  <View key={index} style={styles.messageContainer}>
                    <Text style={styles.senderText}>{message.sender}</Text>
                    <Text style={styles.messageText}>{message.text}</Text>
                  </View>
                ))}
                </ScrollView>            
    <View style={styles.bottom}>
        <TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate('Chatlist')}>
          <Ionicons name="mic" size={30} color="gray" />
        </TouchableOpacity>   

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message here..."
        style={styles.input}
      />
      <TouchableOpacity onPress={() => { onSend(message); setMessage(''); }} style={styles.leftButton}>
        <Ionicons name="send" size={30} color="gray" />
      </TouchableOpacity>

        <TouchableOpacity style={styles.leftButton} onPress={toggleExpand}>
          <Ionicons name="add-circle" size={30} color="gray" />
        </TouchableOpacity>                
    </View>


            </KeyboardAvoidingView>
            </SafeAreaView>
    );
   

  
};
const styles = StyleSheet.create({
safeArea: {
    flex: 1, 
    backgroundColor: colors.gray_background, 
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    },
  header: {
    backgroundColor: colors.gray_background, 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 2, 
    borderBottomColor: '#ccc', 
  },
  leftButton: {
    
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green_dark,
    marginBottom: 8,
    textAlign: 'center',
 
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // 圆形头像
    },
    bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: colors.gray_background, 
  },
    input: {
    flex: 0.8,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ccc', // 边框颜色
  },
  messageContainer: {
    backgroundColor: colors.gray_light,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
});
export default ChatDetailScreen;
