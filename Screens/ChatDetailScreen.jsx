import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { colors } from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { collection, query, orderBy, onSnapshot, setDoc, serverTimestamp, doc, where, getDocs } from "firebase/firestore";
import { getAuth, db } from "../firebaseConfig";

const ChatDetailScreen = ({ navigation, route }) => {
  const { userName, userAvatar, receiverUID } = route.params; // Assuming you pass receiver UID from the previous screen
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const otherID = route.params.userId[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await new Promise((resolve, reject) => {
          const unsubscribe = getAuth().onAuthStateChanged(user => {
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

  useEffect(() => {
    if (currentUserId) {
      const messagesQuery = query(
        collection(db, "messages"),
        where("sender", "in", [otherID, currentUserId]),
        where("receiver", "in", [otherID, currentUserId]),
        orderBy("timestamp")
      );

      const unsubscribe = onSnapshot(messagesQuery, snapshot => {
        const messagesWithSenderNames = snapshot.docs.map(doc => {
          const messageData = doc.data();
          return {
            ...messageData,
            senderName: messageData.sender === currentUserId ? 'You' : userName,
          };
        });
        setMessages(messagesWithSenderNames);
      });

      return () => unsubscribe();
    }
  }, [currentUserId]);

  const onSend = async (message) => {
    if (message.trim()) {
      try {
        const newMessageRef = doc(collection(db, "messages"));
        await setDoc(newMessageRef, {
          sender: currentUserId,
          receiver: otherID,
          text: message,
          timestamp: serverTimestamp()
        });
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const { uri } = result.assets[0];
        if (uri) {
          const newMessageRef = doc(collection(db, "messages"));
          await setDoc(newMessageRef, {
            sender: currentUserId,
            receiver: otherID,
            imageUri: uri,
            timestamp: serverTimestamp()
          });
        }
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

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
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileInfo')}>
            <Image source={userAvatar ? { uri: userAvatar } : require('../assets/Profile.png')} style={styles.userAvatar} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {messages.map((message, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text style={styles.senderText}>{message.senderName}</Text>
              {message.text && <Text style={styles.messageText}>{message.text}</Text>}
              {message.imageUri && <Image source={{ uri: message.imageUri }} style={styles.messageImage} />}
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.leftButton} onPress={() => { /* add functionality if needed */ }}>
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

          {isExpanded && (
            <TouchableOpacity style={styles.leftButton} onPress={handleImagePick}>
              <Ionicons name="image" size={30} color="gray" />
            </TouchableOpacity>
          )}
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
  leftButton: {},
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
    borderRadius: 20,
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
    borderColor: '#ccc',
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
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default ChatDetailScreen;
