import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const ChatDetailScreen = ({ navigation, route }) => {
    const { userName, userAvatar } = route.params; // 假设这些信息是从ChatListScreen传过来的
    const [isExpanded, setIsExpanded] = useState(false); 
    const [message, setMessage] = React.useState('');

    const onSend = (message) => {
        if (message.trim()) {
      console.log("Sending message:", message);

      setMessage(''); 
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
});
export default ChatDetailScreen;
