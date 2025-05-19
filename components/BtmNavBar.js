import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AddTask from './AddTask';
import TaskDetails from './TaskDetails';
import ProfileScreen from './ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define stack navigation inside Home Tab
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
    </Stack.Navigator>
  );
}

export default function BtmNavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'View All Tasks') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Add New Task') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Archived Tasks') {
            iconName = focused ? 'archive' : 'archive-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="View All Tasks" component={ProfileScreen} />
      <Tab.Screen name="Add New Task" component={AddTask} />
      <Tab.Screen name="Archived Tasks" component={ProfileScreen} />
    </Tab.Navigator>
  );
}