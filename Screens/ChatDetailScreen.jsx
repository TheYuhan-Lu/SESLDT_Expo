import React, { useState, useEffect } from 'react';
import {  SafeAreaView, ScrollView, View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';

const initialMessages = [
  // 初始化消息列表，可能包含文本、图片和音频消息
];

const ChatDetailScreen = ({ route }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState('');
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [playingAudioId, setPlayingAudioId] = useState(null); // 跟踪当前正在播放的音频ID

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  const sendMessage = async (messageType, content, duration = null) => {
    const newMessage = {
      id: Date.now().toString(),
      text: content,
      type: messageType,
      duration,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setText('');
  };

  const pickImage = async () => {
    // 图片选择逻辑
  };

  const startRecording = async () => {
    // 开始录音逻辑
  };

  const stopRecording = async () => {
    // 停止录音逻辑，包括保存音频时长
  };

  const playSound = async (audioUri, audioId) => {
    if (playingAudioId === audioId) {
      sound.stopAsync();
      setPlayingAudioId(null);
      return;
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
       { uri: audioUri },
       { shouldPlay: true }
    );
    setSound(newSound);
    setPlayingAudioId(audioId);

    await newSound.playAsync();
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isPlaying) {
        setPlayingAudioId(null);
      }
    });
  };

  const renderItem = ({ item }) => {
    let messageContent;
    switch (item.type) {
      case 'text':
        messageContent = <Text>{item.text}</Text>;
        break;
      case 'image':
        messageContent = <Image source={{ uri: item.text }} style={{ width: 200, height: 200 }} />;
        break;
      case 'audio':
        messageContent = (
          <TouchableOpacity onPress={() => playSound(item.text, item.id)}>
            <Text>Play Audio ({item.duration ? `${item.duration}s` : 'Loading...' })</Text>
          </TouchableOpacity>
        );
        break;
      default:
        messageContent = <Text>Unsupported message type</Text>;
    }
    return (
      <View style={styles.message}>
        {messageContent}
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* 其余UI和逻辑 */}
    </View>
  );
};

// 添加样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  message: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  timestamp: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  // Additional styles if necessary
});

export default ChatDetailScreen;