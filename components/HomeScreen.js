import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-gray-300 p-5">
      <Text className="text-xl font-bold text-center mb-5">Task List</Text>

      {tasks.length === 0 ? (
        <Text className="text-center text-gray-600">No tasks added yet.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('TaskDetails', { task: item })}>
              <View className="bg-white p-5 mb-4 rounded-lg shadow-lg">
                <Text className="text-lg font-bold">{item.name}</Text>
                <View className={`p-3 rounded-lg ${item.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`}>
                  <Text className="text-white text-center font-bold">{item.status.toUpperCase()}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}