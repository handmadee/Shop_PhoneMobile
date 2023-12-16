import { createStackNavigator } from '@react-navigation/stack';
import HomeProfileUser from '../screens/UserScreen/ProfileUser/HomeProfileUser';
import DetailInforUser from '../components/Setting/Profile';

const Stack = createStackNavigator();
export default function SettingNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomeProfileUser" component={HomeProfileUser} />
      <Stack.Screen name="DetailInforUser" component={DetailInforUser} />
    </Stack.Navigator>
  );
}
