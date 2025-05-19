import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';


export default function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const navigation = useNavigation();


const saveTask = async () => {
    try {
      const newTask = { name: taskName.toUpperCase(), description: taskDescription, status: 'pending' };
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

      alert(`${taskName.toUpperCase()} is now added!`);
      setTaskName('');
      setTaskDescription('');

      // Navigate back to HomeScreen, triggering re-render
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };


  return (
    <View className="flex-1 bg-gray-300 p-5 justify-center items-center">
      <View className="bg-gray-500 p-10 py-12 container min-h-[280px] max-h-[780px] rounded-xl justify-center">
        {/* Task Name */}
        <TextInput
          className="bg-white p-3 mb-4 rounded-lg p-5"
          placeholder="Task Name"
          value={taskName.toUpperCase()}
          onChangeText={setTaskName}
        />

        {/* Task Description */}
        <TextInput
          className="bg-white p-5 mb-4 rounded-lg h-24"
          placeholder="Task Description"
          multiline={true}
          value={taskDescription}
          onChangeText={setTaskDescription}
        />

        <TouchableOpacity className="bg-red-500 p-5 rounded mt-10 rounded-lg" onPress={saveTask}>
          <Text className="text-white text-center font-bold">Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}