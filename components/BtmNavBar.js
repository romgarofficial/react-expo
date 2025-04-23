import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddTask from './AddTask';



const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="View All Tasks" component={ProfileScreen} />
      <Tab.Screen name="Add New Task" component={AddTask} />
      <Tab.Screen name="Archived Tasks" component={ProfileScreen} />
    </Tab.Navigator>
  );
}