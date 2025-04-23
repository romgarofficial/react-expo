import React from 'react';
import { TextInput, View, Text, TouchableOpacity} from 'react-native';

export default function AddTask() {
  return (
    <View className="flex-1 bg-gray-300 p-5 justify-center items-center">
      <View className="bg-gray-500 p-10 py-12 container min-h-[380px] max-h-[780px] rounded-xl justify-center">
        {/* Task Name TextInput */}
        <TextInput
          className="bg-white p-3 mb-4 rounded-lg p-5"
          placeholder="Task Name"
        />

        <TextInput
          className="bg-white p-5 mb-4 rounded-lg h-24"
          placeholder="Task Description"
          multiline={true}
        />
        <TouchableOpacity className="bg-red-500 p-5 rounded mt-10 rounded-lg">
          <Text className="text-white text-center font-bold">Add Task</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}