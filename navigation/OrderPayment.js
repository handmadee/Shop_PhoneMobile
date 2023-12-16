import { createStackNavigator } from '@react-navigation/stack';
import Order from '../components/UI/datsatus/Status/Order';
import { ShoppingCartScreen } from '../screens';
const Stack = createStackNavigator();
export default function OrderPayment() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="ShoppingCartScreen" component={ShoppingCartScreen} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  );
}
